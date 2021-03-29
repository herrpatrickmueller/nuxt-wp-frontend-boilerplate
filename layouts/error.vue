<script>
export default {
  name: 'NuxtError',
  components: {

  },
  layout: 'default'
}
</script>

<template>
  <div class="error">
    <h1 class="error__title">404</h1>
    <p class="error__msg">Seite nicht gefunden.</p>
  </div>
</template>

<style lang="scss">
.error {
  @include container;
  text-align: center;
}

.error__title {
  font-size: 16vw;
  line-height: 1;
}

.error__msg {
  margin: 1vw 0;
  font-size: 4vw;
}
</style>