<template lang="pug">
    div.filter-component
      v-text-field(@keydown.enter.prevent="setFilter" v-model="queryString" class="mt-1 white--text lighten-4" prepend-inner-icon="mdi-magnify" append-icon="mdi-filter-multiple" hide-details="auto" clearable filled rounded)
</template>

<script lang="ts">
// import questionsApi from "@/services/questions.api";
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventBus } from "@/mixins/event-bus";

@Component({
  name: "FilterComponent",
  components: {},
})
export default class FilterComponent extends Vue {
  queryString: any = null;
  /**
   * todo
   *  type n enter search into question title & tags
   *
   */
  setFilter() {
    console.log(this.queryString);
    let filter = {
      query: this.queryString,
      // topics: user.topic,
      // tags: [],
      // languages: user.languagesSpeaks,
      // isPaid: undefined,
      // sortBy: "newest",
    };
    this.$store.commit("setFilters", filter);
    eventBus.$emit("filterQuestions", filter);
  }
}
</script>

<style scoped></style>
