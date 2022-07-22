<template lang="pug">
  v-container.grid-list-xs
    v-row.no-gutter
      //- offer section
      v-col.col-md-3.col-sm-12.col-xs-12
        create-offer-component(:question="question")
        question-offer-list.mt-3(:question="question")
      //- question section
      v-col.col-md-9.col-sm-12.col-xs-12
        .ml-1
          .text-h6 {{ question.title }}
          .caption.mt-2 {{ question.detail }}
          solution-channels-component.ml-auto(v-if="question.solutionChannels" :solutionChannels="question.solutionChannels")
          user-signature-as-questioner(:User="question.byUser")
          .d-flex
            question-value-component(:question="question")
            .caption.ml-auto.grey--text.lighten-4 asked {{ humanized_time_span(question.createdAt) }}
          question-comments-list-component(:question="question")


</template>

<script lang="ts">
import QuestionDetailResponseDTO from "@/dto/response/question-detail-response.dto";
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";
import CreateOfferComponent from "@/components/Offer/CreateOfferComponent.vue";
import QuestionOfferList from "@/components/Offer/List.vue";
import SolutionChannelsComponent from "@/components/Question/SolutionChannels.vue";
import QuestionValueComponent from "@/components/Question/QuestionValueComponent.vue";
import QuestionCommentsListComponent from "@/components/Comments/List.vue";
import UserSignatureAsQuestioner from "@/components/User/Signature/AsQuestioner.vue";
import { General } from "@/mixins/general";

@Component({
  name: "QuestionDetailComponent",
  components: {
    VueEditor,
    CreateOfferComponent,
    QuestionOfferList,
    SolutionChannelsComponent,
    QuestionValueComponent,
    QuestionCommentsListComponent,
    UserSignatureAsQuestioner,
  },
})
export default class QuestionDetailComponent extends Mixins(General) {
  @Prop({ required: true }) readonly question!: QuestionDetailResponseDTO;
}
</script>
