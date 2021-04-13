<script>
export default {
  name: "Person",
  props: {
    data: Object
  },
  computed: {
    detailUrl() {
      return `/person/${this.data.person.post_name}`;
    },
    portraitSrc() {
      return this.data.person.fields.portrait
        ? this.data.person.fields.portrait.sizes.large
        : null;
    },
    portraitAlt() {
        return this.data.person.fields.portrait
        ? this.data.person.fields.portrait.alt
        : this.data.person.fields.name;
    }
  }
};
</script>

<template>
  <nuxt-link class="person" v-bind:to="detailUrl">
    <article class="person__container">
      <div class="person__portrait">
        <img class="person__portrait-img" v-bind:src="portraitSrc" v-bind:alt="portraitAlt" />
      </div>
      <h2 class="person__name">{{ data.person.fields.name }}</h2>
      <h3 class="person__role">{{ data.person.fields.role }}</h3>
    </article>
  </nuxt-link>
</template>

<style lang="scss">
.person {
  text-decoration: none;
}

.person__portrait {
  position: relative;
  padding-bottom: 66.66%;
}

.person__portrait-img {
  position: absolute;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

.person__name {
  margin: 2.5rem 0 0;
  line-height: 1.3;
}

.person__role {
  margin: 0;
  line-height: 1.3;
}
</style>