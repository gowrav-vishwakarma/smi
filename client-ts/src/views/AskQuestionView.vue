<template>
  <v-container grid-list-xs>
    <ask-question-component></ask-question-component>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AskQuestionComponent from "@/components/Question/AskQuestionComponent.vue";

@Component({
  components: {
    AskQuestionComponent,
  },
})
export default class AskQuestionView extends Vue {}
</script>
