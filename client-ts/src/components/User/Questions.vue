<template lang="pug">
    .caption My Questions
</template>

<script lang="ts">
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import userApi from "@/services/user.api";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "UserQuestions",
})
export default class UserQuestionsComponent extends Vue {
  questions: QuestionListResponseDTO[] = [];

  async mounted() {
    this.questions = await userApi.getMyQuestions();
    console.log(this.questions)
  }
}
</script>
