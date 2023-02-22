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
import { eventBus } from "@/mixins/event-bus";

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
    eventBus.$on("filterQuestions", async (filterData: any) => {
      // Handle the event data
      // console.log(filterData.query);
      // this.filter.query = filterData;
      await this.getQList(filterData);
    });

    this.getQList({});
  }

  async getQList(filterData: any) {
    let filterQuery = this.filter;
    if (filterData != undefined) {
      filterQuery = filterData;
    }

    this.questions = await QuestionApiService.getQuestions(filterQuery);
  }

  authDialogCallback(value: any) {
    console.log("callback function", value);
  }
}
</script>
