<template lang="pug">
  v-card.mb-2.pa-2.question-single-card(v-if="question")
    //- .d-flex.flex-column
      //- .d-flex
        //- .h4.blue--text(@click="gotoDetails" style="cursor:pointer") {{ question.title }}
        //- solution-channels-component.ml-auto(v-if="question.solutionChannels" :solutionChannels="question.solutionChannels")
      //- .caption {{ shortdetail }}
      //- .d-flex.flex-column
        //- questioner-signature(:User="question.byUser")
        //- .d-flex
          //- question-value-component(:question="question")
          //- .caption.ml-auto.grey--text.lighten-4 asked {{ humanized_time_span(question.createdAt) }}
    //- voting-component(:question="question")
    questioner-signature(:User="question.byUser")
    v-card.pa-0.ma-0.question-detail-card(flat)
      h4.text-subtitle-1.question-heading(@click="gotoDetails" style="cursor:pointer") Q. {{question.title}}
      .question-description-text
        .text-body-2.text--secondary.text-justify.question-description-text {{shortdetail}}
        v-card.question-description-image(color="primary lighten-3" flat v-if="question.image")
          v-card-body
            v-img(src="@/assets/logo.png" max-height="350" contain)
        v-card.question-description-video(color="primary lighten-3" flat v-if="question.video")          
    .d-flex.mt-3
      .caption.grey--text.lighten-4 asked {{ humanized_time_span(question.createdAt) }}
      .caption.primary--text.lighten-4.ml-auto {{convertTotag(question.tags)}}
    v-divider
    .d-flex.mt-1(style="align-items:center")
      div
        question-value-component(:question="question")
        .d-flex
          voting-component(:question="question")
          booking-component(:question="question")
          share-button(:question="question")
      .ml-auto
        .d-flex
          solution-channels-component(v-if="question.solutionChannels" :solutionChannels="question.solutionChannels")
          v-btn.primary(rounded small @click="gotoDetails") Answer
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
