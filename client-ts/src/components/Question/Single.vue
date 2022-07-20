<template lang="pug">
  v-card.mb-2.pa-2(v-if="question")
    .d-flex.flex-column
      .d-flex
        .h4.blue--text(@click="gotoDetails" style="cursor:pointer") {{ question.title }}
        solution-channels-component.ml-auto(v-if="question.solutionChannels" :solutionChannels="question.solutionChannels")
      .caption {{ shortdetail }}
      .d-flex.flex-column
        by-user-component(:byUser="question.byUser")
        .d-flex
          .caption {{ question.questionValue.totalVoteCount }} Votes, {{ question.questionValue.totalCommentsCount }} Comments, {{ question.questionValue.totalOfferingCount }} Offers
          .caption.ml-auto.grey--text.lighten-4 asked {{ humanized_time_span(question.createdAt) }}
</template>

<script lang="ts">
import "reflect-metadata";
import S from "string";
import { Component, Prop, Mixins } from "vue-property-decorator";
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import { General } from "@/mixins/general";
import SolutionChannelsComponent from "@/components/Question/SolutionChannels.vue";
import ByUserComponent from "@/components/Question/ByQuestioner.vue";

// import DataService from "@/services/DataService";

@Component({
  name: "QuestionSingle",
  components: {
    SolutionChannelsComponent,
    ByUserComponent,
  },
})
export default class QuestionSingle extends Mixins(General) {
  @Prop({ default: null })
  readonly question!: QuestionListResponseDTO;

  gotoDetails() {
    this.$router.push("question/" + this.question._id);
  }

  get shortdetail() {
    return S(this.question.detail).truncate(100).s;
  }
}
</script>
