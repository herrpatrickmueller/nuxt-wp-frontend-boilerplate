<script>
import Person from "@/components/content/Person";

export default {
  name: "PeopleOverview",
  components: {
    Person
  },
  props: {
    data: Object
  },
};
</script>

<template>
  <div class="people-overview">
    <div class="people-overview__person" v-for="person in data.people" v-bind:key="person.ID">
      <person v-bind:data="person" />
    </div>
  </div>
</template>

<style lang="scss">
.people-overview {
  @include grid();
}

.people-overview__person {
  @include grid__cell(4);
  margin-top: 2rem;

  @include breakpoint('tablet') {
    @include grid__cell(6);
  }

  @include breakpoint('phone') {
    @include grid__cell(12);
  }
}
</style>