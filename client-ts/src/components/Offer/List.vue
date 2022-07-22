<template lang="pug">
    div(style="width: 100%" v-if="question")
        single-offer(v-for="offer in questionOffers" :offer="offer" :key="offer._id" :question="question")
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import QuestionDetailResponseDTO from "@/dto/response/question-detail-response.dto";
import SingleOffer from "@/components/Offer/SingleOfferComponent.vue";
import questionsApi from "@/services/questions.api";

@Component({
  name: "QuestionOfferList",
  components: {
    SingleOffer,
  },
})
export default class QuestionOfferListComponent extends Vue {
  @Prop({ default: null }) readonly question!: QuestionDetailResponseDTO;

  questionOffers: any[] = [];

  async mounted() {
    questionsApi.getOffers(this.question._id).then((offers) => {
      this.questionOffers = offers;
    });
  }
}
</script>
