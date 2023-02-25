<template lang="pug">
  v-card.mb-2.pa-5.question-single-card(v-if="question")
    questioner-signature(:User="question.byUser")
    v-card.pa-0.ma-0.question-detail-card(flat)
      h4.text-subtitle-1.question-heading(@click="gotoDetails" style="cursor:pointer") Q. {{question.title}}
      .question-description-text
        .text-body-2.text--secondary.text-justify.question-description-text {{shortdetail}}
        v-card.question-description-image(color="primary lighten-3" flat v-if="question.image")
          v-card-body
            v-img(src="@/assets/logo.png" max-height="350" contain)
        v-card.question-description-video(color="primary lighten-3" flat v-if="question.video")
          v-card-body
            video(width="320" height="240" controls)
              source(:src="question.video" type="video/webm")
    .d-flex.mt-3
      .caption.grey--text.lighten-4 asked {{ humanized_time_span(question.createdAt) }}
      .caption.primary--text.lighten-4.ml-auto {{convertTotag(question.tags)}}
    v-divider
    .d-flex.mt-1(style="align-items:center")
      div
        question-value-component(:question="question")
        .d-flex
          voting-component(v-if="!disableVotingAction" :question="question")
          booking-component(v-if="!disableBookmarkAction" :question="question")
          share-button(v-if="!disableShareAction" :question="question")
      .ml-auto(v-if="!disableAnswerSection")
        .d-flex
          solution-channels-component(v-if="question.solutionChannels" :solutionChannels="question.solutionChannels")
          v-btn.primary(v-if="!disableAnswerBtn" rounded small @click="gotoDetails") Answer
</template>

<script lang="ts">
import "reflect-metadata";
import S from "string";
import { Component, Prop, Mixins } from "vue-property-decorator";
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import { General } from "@/mixins/general";
import SolutionChannelsComponent from "@/components/Question/SolutionChannels.vue";
import QuestionerSignature from "@/components/User/Signature/AsQuestioner.vue";
import QuestionValueComponent from "@/components/Question/QuestionValueComponent.vue";
import VotingComponent from "@/components/Common/VotingComponent.vue";
import BookingComponent from "@/components/Common/BookmarkComponent.vue";
import ShareButton from "@/components/Common/ShareButton.vue";

// import DataService from "@/services/DataService";

@Component({
  name: "QuestionSingle",
  components: {
    SolutionChannelsComponent,
    QuestionerSignature,
    QuestionValueComponent,
    VotingComponent,
    BookingComponent,
    ShareButton,
  },
})
export default class QuestionSingle extends Mixins(General) {
  @Prop({ default: null })
  readonly question!: QuestionListResponseDTO;

  @Prop({ default: false }) disableAnswerBtn: any;

  @Prop({ default: false }) disableAnswerSection: any;

  @Prop({ default: false }) disableShareAction: any;

  @Prop({ default: false }) disableBookmarkAction: any;

  @Prop({ default: false }) disableVotingAction: any;

  gotoDetails() {
    this.$router.push("question/" + this.question._id);
  }

  get shortdetail() {
    return S(this.question.detail).stripTags().truncate(100).s;
  }

  convertTotag(inArr: [string]) {
    return inArr.length > 0
      ? inArr
          .map((i: string) => {
            return "#" + i;
          })
          .join(" ")
      : "";
  }
}
</script>
