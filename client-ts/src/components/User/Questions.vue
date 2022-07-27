<template lang="pug">
div(style="width: 100%")
  question-single(v-for="(question, i) in questions" :question="question" :key="questions[i]._id")
</template>


<script lang="ts">
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import userApi from "@/services/user.api";
import { Component, Vue } from "vue-property-decorator";
import QuestionSingle from "@/components/Question/Single.vue";

@Component({
  name: "UserQuestions",
  components: {
    QuestionSingle,
  },
})
export default class UserQuestionsComponent extends Vue {
  questions: QuestionListResponseDTO[] = [];

  async mounted() {
    this.questions = await userApi.getMyQuestions();
    console.log(this.questions)
  }
}
</script>
