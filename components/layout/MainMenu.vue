<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MainMenu',
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    isCurrentPage(item) {
      return item.url === this.$route.path;
    },
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
    closeMenu(isCurrent) {
      if (isCurrent) {
        this.isExpanded = false;
      }
    }
  },
  computed: {
    ...mapGetters({
      mainMenu: 'common/mainMenu',
    }),
  },
}
</script>

<template>
  <nav class="main-menu" v-bind:class="{'main-menu--expanded': isExpanded}">

    <button class="main-menu__button" v-on:click="toggleMenu">
      <span v-if="!isExpanded">Menü</span>
      <span v-else>Menü schliessen</span>
    </button>

    <div class="main-menu__items-wrap">
      <ul class="main-menu__items">
        <li 
          v-for="(item, i) in mainMenu" 
          v-bind:key="i" 
          class="main-menu__item" 
          v-bind:class="{'main-menu__item--is-current': isCurrentPage(item, i)}">
          <router-link 
            v-bind:to="`${item.url}`" 
            v-on:click.native="closeMenu(isCurrentPage(item, i))"
            class="main-menu__link">
              {{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>

  </nav>
</template>

<style lang="scss">
.main-menu:before {
    content: "";
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: $color-light;
    z-index: -1;
    transition: height 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.main-menu--expanded:before {
  @include breakpoint('phone') {
      height: 100%;
    }
}

.main-menu__button {
  display: none;

  @include breakpoint('phone') {
    display: block;
    font-size: 1.8rem;
    font-weight: $font-weight-normal;
    color: $color-primary;
    padding: 0;
    border: 0;
    background-color: transparent;
  }
}

.main-menu__items-wrap {
  @include breakpoint('phone') {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 0%;
    overflow: hidden;
    opacity: 0;
    z-index: -1;
    transition: height 600ms cubic-bezier(0.22, 1, 0.36, 1);
  }
}

.main-menu--expanded .main-menu__items-wrap {
  @include breakpoint('phone') {
    box-sizing: border-box;
    padding: 14rem 2rem;
    height: 100%;
    opacity: 1;
  }
}

.main-menu__items {
  list-style: none;
  display: flex;
  margin: 0 0 0 2rem;
  padding: 0;

  @include breakpoint('phone') {
    display: block;
    margin: 0;
    text-align: center;
  }
}

.main-menu__item {
  margin: 0 0 0 2rem;

  @include breakpoint('phone') {
    margin: 1.5rem 0;
    transform: translateY(2rem);
    opacity: 0;
  }
}

.main-menu--expanded .main-menu__item {
  @include breakpoint('phone') {
    transform: translateY(0);
    opacity: 1;
    transition: 
      transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 600ms linear;

    &:nth-child(1) { transition-delay: 200ms; }
    &:nth-child(2) { transition-delay: 250ms; }
    &:nth-child(3) { transition-delay: 300ms; }
    &:nth-child(4) { transition-delay: 350ms; }
    &:nth-child(5) { transition-delay: 400ms; }
    &:nth-child(6) { transition-delay: 450ms; }
    &:nth-child(7) { transition-delay: 500ms; }
  }
}

.main-menu__item--is-current .main-menu__link,
.main-menu__link:hover {

  &::before {
    transform: scaleX(1);
    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.main-menu__link {
  position: relative;
  font-size: 2rem;
  color: $color-primary;
  text-decoration: none;

  @include breakpoint('phone') {
    font-size: 3.2rem;
  }

  &::before {
    content: "";
    position: absolute;
    display: block;
    bottom: -0.8rem;
    left: 0;
    width: 100%;
    border-bottom: 2px solid $color-primary;
    transform: scaleX(0);
    transition: transform 400ms cubic-bezier(0.36, 0, 0.66, -0.56);


  }
}
</style>