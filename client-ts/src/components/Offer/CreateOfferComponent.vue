<template lang="pug">
    v-btn(color="primary" block rounded @click="createOffer") Offer Solution
</template>

<script lang="ts">
import questionsApi from "@/services/questions.api";
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "CreateOfferSolutionComponent",
})
export default class CreateOfferSolutionComponent extends Vue {
  @Prop({ default: null })
  readonly question!: any;

  async createOffer() {
    if (this.question.myOffer) {
      alert("You have already offered your solution");
      return;
    }
    await questionsApi.createOffer(this.question._id, "Interested");
  }
}
</script>
