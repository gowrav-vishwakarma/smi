<template lang="pug">
  v-container.grid-list-xs
    v-row
      //- offer section
      v-column.col-md-2.col-sm-12.col-xs-12
        create-offer-component
      //- question section
      v-column.col-md-10.col-sm-12.col-xs-12
        .ml-10
          .text-h6 {{ question.title }}
          .caption.mt-2 {{ question.detail }}
</template>

<script lang="ts">
import QuestionDetailResponseDTO from "@/dto/response/question-detail-response.dto";
import { Component, Prop, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";
import CreateOfferComponent from "@/components/Question/Offer/CreateOfferComponent.vue";

@Component({
  name: "QuestionDetailComponent",
  components: {
    VueEditor,
    CreateOfferComponent,
  },
})
export default class QuestionDetailComponent extends Vue {
  @Prop({ required: true }) readonly question!: QuestionDetailResponseDTO;
}
</script>
