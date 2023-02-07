<template lang="pug">
    div
      v-card.pa-2(v-if="!myOffer")
        v-card-title Offer Your Solution
        v-form(ref="createOfferForm" v-model="offerFormValid" @submit.prevent="createOffer")
          v-textarea(v-model="offerFormData.offerAnswerDesc" label="Offer Answer" required outlined auto-grow rows="3" :rules="descRules")
          div
            v-label In which form would you be comfortable in answering the question?
            .d-flex.justify-space-between
              v-switch(v-model="offerFormData.solutionChannelMode" color="primary" label="Chat" value="Chat")
              v-switch(v-model="offerFormData.solutionChannelMode" color="primary" label="Video" value="Video")
            .d-flex
              v-switch(v-model="offerFormData.solutionChannelMode" color="primary" label="Screen Share" value="ScreenShare")
            //- v-alert(border="top" color="red lighten-2" dark v-if="!offerFormData.solutionChannelMode.length") | Please Select at least one mode
          v-btn(color="primary" block rounded :disabled="myOffer" type="submit" ) {{caption}}
      v-card(v-else  :disabled="myOffer" )
        v-card-title {{caption}}, please wait
</template>

<script lang="ts">
import questionsApi from "@/services/questions.api";
import "reflect-metadata";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
  name: "CreateOfferSolutionComponent",
})
export default class CreateOfferSolutionComponent extends Vue {
  @Ref("createOfferForm") private createOfferForm!: HTMLFormElement;

  descRules = [(v: string) => !!v || "Description is required"];

  @Prop({ default: null })
  readonly question!: any;

  offerFormValid = false;
  offerFormData = {
    offerAnswerDesc: null,
    solutionChannelMode: [],
  };

  async createOffer() {
    // let xyz = this.createOfferForm.validate();
    // console.log(xyz);
    let isFormValid = this.createOfferForm.validate();

    if (
      isFormValid &&
      this.$store.getters.loggedInUser &&
      this.$store.getters.loggedInUser._id
    ) {
      if (this.question.myOffer) {
        alert("You have already offered your solution");
        return;
      }
      await questionsApi.createOffer(
        this.question.questionerId,
        this.question._id,
        this.offerFormData.offerAnswerDesc
          ? this.offerFormData.offerAnswerDesc
          : "Interested",
        this.offerFormData.solutionChannelMode
      );
    }
  }

  get myOffer() {
    return this.question.myOffer ? true : false;
  }

  get caption() {
    return this.question.myOffer ? "Already offered" : "Offer your solution";
  }
}
</script>
