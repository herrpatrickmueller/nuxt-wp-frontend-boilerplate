<template>
  <header class="page-header">
    <div class="page-header__container">
      <router-link class="page-header__logo" to="/">
        <logo />
      </router-link>
      <div class="page-header__main-menu">
        <main-menu />
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/layout/Logo';
import MainMenu from '@/components/layout/MainMenu';

export default {
  name: 'PageHeader',
  components: {
    Logo,
    MainMenu
  }
};
</script>

<style lang="scss">
.page-header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 6rem 0;
  z-index: 1;
  background-color: $color-background;

  @include breakpoint('phone') {
    padding: 3rem 0;
  }
}

.page-header__container {
  @include container;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header__logo {
  flex: 0 1 50%;
  max-width: 19rem;

  @include breakpoint('phone') {
    max-width: 14rem;
  }
}
</style>