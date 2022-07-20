<template lang="pug">
  v-container.grid-list-xs
    v-row.no-gutter
      //- offer section
      v-col.col-md-2.col-sm-12.col-xs-12
        create-offer-component
        question-offer-list.mt-3(:question="question")
      //- question section
      v-col.col-md-10.col-sm-12.col-xs-12
        .ml-1
          .text-h6 {{ question.title }}
          .caption.mt-2 {{ question.detail }}
</template>

<script lang="ts">
import QuestionDetailResponseDTO from "@/dto/response/question-detail-response.dto";
import { Component, Prop, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";
import CreateOfferComponent from "@/components/Question/Offer/CreateOfferComponent.vue";
import QuestionOfferList from "@/components/Question/Offer/List.vue";

@Component({
  name: "QuestionDetailComponent",
  components: {
    VueEditor,
    CreateOfferComponent,
    QuestionOfferList,
  },
})
export default class QuestionDetailComponent extends Vue {
  @Prop({ required: true }) readonly question!: QuestionDetailResponseDTO;
}
</script>
