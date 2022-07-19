<template>
  <v-container grid-list-xs>
    <question-list></question-list>
  </v-container>
</template>

<script lang="ts">
import QuestionList from "@/components/Question/List.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    QuestionList,
  },
})
export default class HomeView extends Vue {}
</script>
