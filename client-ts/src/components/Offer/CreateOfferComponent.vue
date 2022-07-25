<template lang="pug">
    v-btn(color="primary" block rounded @click="createOffer" :disabled="myOffer") {{caption}}
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
    await questionsApi.createOffer(
      this.$store.getters.loggedInUser._id,
      this.question._id,
      "Interested"
    );
  }

  get myOffer() {
    return this.question.myOffer ? true : false;
  }

  get caption() {
    return this.question.myOffer ? "Already offered" : "Offer your solution";
  }
}
</script>
