<template>
  <v-container style="width: 95%; max-width: 95%">
    <v-row>
      <v-col cols="12" sm="2" md="2" lg="2">
        <v-sheet rounded="lg" min-height="268"> </v-sheet>
      </v-col>
      <v-col cols="12" sm="7" md="7" lg="7">
        <question-list></question-list>
      </v-col>
      <v-col cols="12" sm="3" md="3" lg="3">
        <v-sheet rounded="lg" min-height="268"> </v-sheet>
      </v-col>
    </v-row>
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
