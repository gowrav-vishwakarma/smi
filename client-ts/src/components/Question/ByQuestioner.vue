<template lang="pug">
    .ml-auto.d-flex.flex-column.align-center
        .d-flex.ml-auto
            user-avatar(:user="byUser")
            .caption.ml-1.blue--text(style="cursor:pointer")  {{byUser.name}} 
        .caption.ml-auto.mt-n1.grey--text.lighten-4
          v-icon(small) mdi-star
          | {{ reputation }}
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ByUser from "@/dto/byUser.dto";
import UserAvatar from "@/components/User/Avatar.vue";

@Component({
  name: "ByUserComponent",
  components: {
    UserAvatar,
  },
})
export default class ByUserComponent extends Vue {
  @Prop({ default: null, required: true }) byUser!: ByUser;

  get reputation(): string {
    const accpectedRatio =
      this.byUser.reputationAsQuestioner.totalMarkedSolved /
      this.byUser.reputationAsQuestioner.totalQuestionsAsked;
    const accpectedRatioFixed = isNaN(accpectedRatio) ? 0 : accpectedRatio;
    const rating =
      this.byUser.reputationAsQuestioner.totalRatingsSum /
      this.byUser.reputationAsQuestioner.totalRatingsCount;
    const ratingFixed = isNaN(rating) ? 0 : rating;
    return `Accpeted ${accpectedRatioFixed}% out of ${this.byUser.reputationAsQuestioner.totalQuestionsAsked} with ${ratingFixed} star rating`;
  }
}
</script>
