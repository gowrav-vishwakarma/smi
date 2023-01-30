<template lang="pug">
    v-card.questioner-rating-card.pa-1.rounded-lg(outlined tile)
        v-list.pa-0
            v-list-item.pa-0
                v-icon(large color="yellow darken-2") mdi-star
                v-list-item-content.ml-1.pa-0(style="display:block;")
                    v-list-item-title.ma-0 
                        small Rating -
                        span.ml-1.primary--text(style="font-size:1em")  {{reputation}}
                    v-list-item-subtitle 
                        small By {{User.reputationAsQuestioner.totalRatingsCount}} user
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import ByUser from "@/dto/byUser.dto";

@Component({
  name: "UserRating",
})
export default class ByUserComponent extends Vue {
  @Prop({ default: null, required: true }) User!: ByUser;

  get reputation(): number {
    const accpectedRatio =
      this.User.reputationAsQuestioner.totalMarkedSolved /
      this.User.reputationAsQuestioner.totalQuestionsAsked;
    const accpectedRatioFixed = isNaN(accpectedRatio) ? 0 : accpectedRatio;
    const rating =
      this.User.reputationAsQuestioner.totalRatingsSum /
      this.User.reputationAsQuestioner.totalRatingsCount;
    return isNaN(rating) ? 0 : rating;
    // const ratingFixed = isNaN(rating) ? 0 : rating;
    // return `Accpeted ${accpectedRatioFixed}% out of ${this.User.reputationAsQuestioner.totalQuestionsAsked} with ${ratingFixed} star rating`;
  }
}
</script>
