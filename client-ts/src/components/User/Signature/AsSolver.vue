<template lang="pug">
    .ml-auto.d-flex.flex-column.align-center
        .d-flex.ml-auto
            user-avatar(:user="User")
            .caption.ml-1.blue--text(style="cursor:pointer")  {{User.name}} 
        .caption.ml-auto.mt-n1.grey--text.lighten-4
          v-icon(small) mdi-star
          | {{ reputation }}
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UserAvatar from "@/components/User/Avatar.vue";

@Component({
  name: "ByUserComponent",
  components: {
    UserAvatar,
  },
})
export default class ByUserComponent extends Vue {
  @Prop({ default: null, required: true }) User: any;

  get reputation(): string {
    const totalSolutionsAttempted =
      this.User.ratingAsSolver.totalOfferingCount +
      this.User.ratingAsSolver.totalCommentsCount;
    const accpectedRatio =
      this.User.ratingAsSolver.totalAcceptedCount / totalSolutionsAttempted;
    const accpectedRatioFixed = isNaN(accpectedRatio) ? 0 : accpectedRatio;
    const rating =
      this.User.ratingAsSolver.totalRatingSum /
      this.User.ratingAsSolver.totalRatingCount;
    const ratingFixed = isNaN(rating) ? 0 : rating;
    return `(${ratingFixed}) ${accpectedRatioFixed}% accepted of ${totalSolutionsAttempted}`;
  }
}
</script>
