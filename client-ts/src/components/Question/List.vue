<template>
  <div style="width: 100%">
    <QuestionSingle
      v-for="(question, i) in questions"
      :question="question"
      :key="questions[i]._id"
    />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import QuestionSingle from "@/components/Question/Single.vue";
import QuestionApiService from "@/services/questions.api";
import { Component, Vue, Prop } from "vue-property-decorator";
import { FilterQuestionsDTO } from "../../dto/request/question-filter.dto";
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";

@Component({
  name: "QuestionList",
  components: {
    QuestionSingle,
  },
})
export default class QuestionList extends Vue {
  questions: QuestionListResponseDTO[] = [];
  @Prop({ default: () => ({}) }) readonly filter!: FilterQuestionsDTO;
  async mounted() {
    this.questions = await QuestionApiService.getQuestions(this.filter);
  }
}
</script>
