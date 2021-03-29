<template>
  <div class="blog-page">
    <template v-if="postContent">
      <div class="blog-page__wrapper" v-bind:key="postContent.id">
        <div class="blog-page__content-column">
          <h1 class="blog-page__title">{{ postTitle }}</h1>
          <div class="blog-page__content" v-html="postContent.content.rendered"></div>
          <!-- <content-blocks v-bind:blocks="postContent.acf.page_content"></content-blocks> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ContentBlocks from '@/components/content/ContentBlocks.vue';

export default {
  components: {
    ContentBlocks
  },
  async asyncData({ app, params, store, error }) {
    const metaResponse = await app.$api.getMeta();
    const menusResponse = await app.$api.getMenus();
    const post = await app.$api.getPost(params.slug);

    if (!post.data || post.data.length === 0) {
      error({
        statusCode: 404,
        message: 'Page not found'
      });
    }

    store.dispatch('post/current', post.data);
    store.dispatch('common/meta', metaResponse.data);
    store.dispatch('common/menus', menusResponse.data);
  },
  head() {
    return {
      title: this.metaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.metaDescription },
        { vmid: 'og:title', property: 'og:title', content: this.metaTitle },
        { vmid: 'og:description', property: 'og:description', content: this.metaDescription },
        { vmid: 'og:url', property: 'og:url', content: this.linkCanonical },
        { vmid: 'og:image', property: 'og:image:secure_url', itemprop: 'image', content: this.ogImage }
      ],
      link: [
        { vmid: 'canonical', rel: 'canonical', href: this.linkCanonical },
      ]
    };
  },
  computed: {
    ...mapGetters({
      post: 'post/current',
      meta: 'common/meta',
    }),
    siteName() {
      return this.meta ? this.meta.blogname : '';
    },
    postTitle() {
      if (!this.post) return;
      return this.post.title 
        ? this.post.title.rendered
        : this.post.post_title;
    },
    metaTitle() {
      if (this.post) {
        return this.post.acf.meta_title 
          ? `${this.post.acf.meta_title} – ${this.siteName}`
          : `${this.postTitle} – ${this.siteName}`;
      } else {
        return this.siteName;
      }
    },
    metaDescription() {
      if (this.post && this.post.acf.meta_description) {
        return this.post.acf.meta_description;
      } else {
        return this.meta ? this.meta.blogdescription : '';
      }
    },
    linkCanonical() {
      return this.post
         ? `${process.env.NUXT_ENV_CMS_BASE_URL}/${this.post.slug}`
         : '';
    },
    ogImage() {
      return this.post.acf.meta_image 
        ? this.post.acf.meta_image.sizes.large 
        : '/og-img.png';
    },
    postContent() {
      return this.post;
    },
  },
  transition: {
    name: 'page-transition',
    mode: 'out-in'
  }
};
</script>

<style lang="scss">
.blog-page {
  @include container;
}

.blog-page__wrapper {
  @include grid();
}

.blog-page__content-column {
  @include grid__cell(5);
  @include grid__cell--push-left(1);
  max-width: 68rem;

  @include breakpoint('tablet') {
    @include grid__cell(11);
  }

  @include breakpoint('phone') {
    @include grid__cell(12);
    @include grid__cell--push-left(0);
  }
}

.blog-page__title {
  font-size: 5rem;
  line-height: 1.2;

  @include breakpoint('phone') {
    font-size: 4rem;
  }
}
</style>
