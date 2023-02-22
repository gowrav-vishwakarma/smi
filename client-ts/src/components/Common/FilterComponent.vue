<template lang="pug">
    div.filter-component
      v-text-field(@click:append.prevent="filterFormDialog=true"	 @keydown.enter.prevent="setFilter" v-model="queryString" class="mt-1 white--text lighten-4" prepend-inner-icon="mdi-magnify" append-icon="mdi-filter-multiple" hide-details="auto" clearable filled rounded)
      v-dialog(v-model="filterFormDialog" width="600")
        v-card.pa-4
          Question-Filters(:callback="setFilter")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventBus } from "@/mixins/event-bus";
import QuestionFilters from "@/components/Question/FilterForm.vue";

@Component({
  name: "FilterComponent",
  components: {
    QuestionFilters,
  },
})
export default class FilterComponent extends Vue {
  queryString: any = null;
  filterFormDialog = false;
  /**
   * todo
   *  type n enter search into question title & tags
   *
   */
  setFilter(filters: any) {
    if (this.queryString) {
      let filter = {
        query: this.queryString,
      };
      this.$store.commit("setFilters", filter);
      eventBus.$emit("filterQuestions", filter);
    } else if (filters != undefined) {
      this.$store.commit("setFilters", filters);
      eventBus.$emit("filterQuestions", filters);
    }

    this.filterFormDialog = false;
  }
}
</script>

<style scoped></style>
