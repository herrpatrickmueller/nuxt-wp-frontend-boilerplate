<script>
export default {
  name: 'NuxtError',
  props: ['error'],
  computed: {
    errorMessage() {
      switch (this.error.statusCode) {
        case 404:
          return 'Seite nicht gefunden.';
      
        default:
          return 'Es ist ein Fehler aufgetreten.';
      }
    }
  },
  layout: 'default'
}
</script>

<template>
  <div class="error">
    <h1 class="error__title">{{ error.statusCode }}</h1>
    <p class="error__msg">{{ errorMessage }}</p>
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