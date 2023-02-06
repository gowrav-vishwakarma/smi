<template>
  <v-container style="width: 100%; max-width: 100%">
    <v-row>
      <v-col cols="12" sm="2" md="2" lg="2">
        <v-sheet rounded="lg" min-height="268">
          <topic-list></topic-list>
        </v-sheet>

        <v-sheet rounded="lg" min-height="268" class="mt-3">
          Topics
          <topic-list getTopicList="true"></topic-list>
        </v-sheet>
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
import TopicList from "@/components/Topic/List.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    QuestionList,
    TopicList,
  },
})
export default class HomeView extends Vue {}
</script>
