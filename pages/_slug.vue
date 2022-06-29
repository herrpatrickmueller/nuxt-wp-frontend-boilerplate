<script>
import { mapGetters } from 'vuex';
import path from '@/util/path';
import ContentBlocks from '@/components/content/ContentBlocks.vue';

export default {
  components: {
    ContentBlocks
  },
  async asyncData({ app, route, params, store, error }) {
    const metaResponse = await app.$api.getMeta();
    const menusResponse = await app.$api.getMenus();

    const page = route.name === 'index'
      ? await app.$api.getFrontpage()
      : await app.$api.getPage(params.slug);

    if (!page.data || page.data.length === 0) {
      error({
        statusCode: 404,
        message: 'Page not found'
      });
    }

    store.dispatch('page/current', page.data);
    store.dispatch('common/meta', metaResponse.data);
    store.dispatch('common/menus', menusResponse.data);

    // get page data directly, via store page transition wont work
    return {
      page: Array.isArray(page.data) ? page.data[0] : page.data
    }
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
      meta: 'common/meta',
    }),
    siteName() {
      return this.meta ? this.meta.blogname : '';
    },
    pageTitle() {
      if (!this.page) return;
      return this.page.title 
        ? this.page.title.rendered
        : this.page.post_title;
    },
    metaTitle() {
      if (this.page) {
        return this.page.fields.meta_title 
          ? `${this.page.fields.meta_title} – ${this.siteName}`
          : `${this.pageTitle} – ${this.siteName}`;
      } else {
        return this.siteName;
      }
    },
    metaDescription() {
      if (this.page && this.page.fields.meta_description) {
        return this.page.fields.meta_description;
      } else {
        return this.meta ? this.meta.blogdescription : '';
      }
    },
    linkCanonical() {
      return this.page && this.page.slug
         ? path.join(process.env.NUXT_ENV_BASE_URL, this.page.slug)
         : process.env.NUXT_ENV_BASE_URL;
    },
    ogImage() {
      return this.page.fields.meta_image 
        ? this.page.fields.meta_image.sizes.large 
        : '/og-img.png';
    },
    pageContent() {
      return this.page;
    },
  },
  transition: {
    name: 'page-transition',
    mode: 'out-in'
  }
};
</script>

<template>
  <div class="content-page" v-bind:key="pageContent.id">
    <h1 class="content-page__title">{{ pageTitle }}</h1>
    <!-- <div class="content-page__content" v-html="pageContent.content.rendered"></div> -->
    <content-blocks v-bind:blocks="pageContent.fields.page_content"></content-blocks>
  </div>
</template>

<style lang="scss">
.content-page {
  @include container;
}

.content-page__title {
  font-size: 5rem;
  line-height: 1.2;

  @include breakpoint('phone') {
    font-size: 4rem;
  }
}
</style>
