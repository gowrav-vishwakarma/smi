<template>
  <v-container grid-list-xs>
    <question-detail-component :question="question" v-if="question" />
  </v-container>
</template>

<script lang="ts">
import QuestionDetailComponent from "@/components/Question/QuestionDetailComponent.vue";
import QuestionDetailResponseDTO from "@/dto/response/question-detail-response.dto";
import questionsApi from "@/services/questions.api";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    QuestionDetailComponent,
  },
})
export default class QuestionDetailView extends Vue {
  question: QuestionDetailResponseDTO | null = null;

  async mounted() {
    this.question = await questionsApi.getQuestion(this.$route.params.id);
  }
}
</script>
