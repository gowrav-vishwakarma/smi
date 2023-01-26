<template lang="pug">
  div(style="width: 100%")
    question-single(v-for="(question, i) in questions" :question="question" :key="questions[i]._id")
    //- AuthDialog(:showDialog="showAuthDialog")
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";
import { FilterQuestionsDTO } from "../../dto/request/question-filter.dto";
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import QuestionSingle from "@/components/Question/Single.vue";
import QuestionApiService from "@/services/questions.api";
// import AuthDialog from "@/components/User/AuthDialog.vue";

@Component({
  name: "QuestionList",
  components: {
    QuestionSingle,
    // AuthDialog,
  },
})
export default class QuestionList extends Vue {
  questions: QuestionListResponseDTO[] | null = null;
  @Prop({ default: () => ({}) }) readonly filter!: FilterQuestionsDTO;
  // showAuthDialog = false;
  async mounted() {
    this.questions = await QuestionApiService.getQuestions(this.filter);
  }

  authDialogCallback(value: any) {
    console.log("callback function", value);
  }
}
</script>
