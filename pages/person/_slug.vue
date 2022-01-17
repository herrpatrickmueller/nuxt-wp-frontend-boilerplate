<template>
  <div class="person-page">
    <template>
      <article class="person-page__wrapper" v-bind:key="page">
        <div class="person-page__content-column">
          <h1 class="person-page__title">{{ pageTitle }}</h1>
          <div class="person-page__portrait">
            <img class="person-page__portrait-img" v-bind:src="portraitSrc" v-bind:alt="portraitAlt" />
          </div>
          <div class="person_page__bio" v-html="page.fields.biography"></div>
        </div>
      </article>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  async asyncData({ app, params, store, error }) {
    const metaResponse = await app.$api.getMeta();
    const menusResponse = await app.$api.getMenus();
    const person = await app.$api.getPerson(params.slug);

    if (!person.data || person.data.length === 0) {
      error({
        statusCode: 404,
        message: 'Page not found'
      });
    }

    store.dispatch('person/current', person.data);
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
      page: 'person/current',
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
      return this.page
         ? `${process.env.NUXT_ENV_BASE_URL}/${this.page.slug}`
         : '';
    },
    ogImage() {
      return this.page.fields.meta_image 
        ? this.page.fields.meta_image.sizes.large 
        : '/og-img.png';
    },
    portraitSrc() {
      return this.page.fields.portrait
        ? this.page.fields.portrait.sizes.large
        : null;
    },
    portraitAlt() {
        return this.page.fields.portrait
        ? this.page.fields.portrait.alt
        : this.page.fields.name;
    }
  },
  transition: {
    name: 'page-transition',
    mode: 'out-in'
  }
};
</script>

<style lang="scss">
.person-page {
  @include container;
}

.person-page__wrapper {
  @include grid();
}

.person-page__content-column {
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

.person-page__title {
  font-size: 5rem;
  line-height: 1.2;

  @include breakpoint('phone') {
    font-size: 4rem;
  }
}

.person-page__portrait {
  margin-top: 6rem;
}

.person-page__portrait-img {
  max-width: 100%;
}
</style>
