<template lang="pug">
  v-card.mb-2.pa-2(v-if="question")
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
    .d-flex
      v-list-item(three-line)
        v-list-item-avatar(tile size="50" color="grey")
        v-list-item-content
          v-list-item-title.primary--text( @click="gotoDetails" style="cursor:pointer") {{question.title}}
          v-list-item-subtitle {{ shortdetail }}
      div
        questioner-signature(:User="question.byUser")
    .d-flex.mt-3
      .caption.grey--text.lighten-4 asked {{ humanized_time_span(question.createdAt) }}
      .caption.primary--text.lighten-4.ml-auto {{convertTotag(question.tags)}} 
    v-divider
    .d-flex.mt-1
      div
        question-value-component(:question="question")
        voting-component(:question="question")
      .ml-auto
        .d-flex
          solution-channels-component(v-if="question.solutionChannels" :solutionChannels="question.solutionChannels")
          v-btn.success(@click="gotoDetails") Answer
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

// import DataService from "@/services/DataService";

@Component({
  name: "QuestionSingle",
  components: {
    SolutionChannelsComponent,
    QuestionerSignature,
    QuestionValueComponent,
    VotingComponent,
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
