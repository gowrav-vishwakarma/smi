<template lang="pug">
  .signature.assolver
    v-card.questioner-avatar-card(flat tile)
        v-list.pa-0
          v-list-item.pa-0.pl-1
            v-avatar(color="primary" size="40" v-if="!disableAvatar")
              user-avatar(:user="User")
            v-list-item-content.ml-1.pa-0(v-if="!disableName")
              v-list-item-title.ma-0 {{User.name}}
                //- span.ml-4.primary--text . Follow
              v-list-item-subtitle
                small {{User.description}} || todo user profile tag here {{reputation}}
    //- .ml-auto.d-flex.flex-column.align-center
    //-     .d-flex.ml-auto
    //-         user-avatar(:user="User")
    //-         .caption.ml-1.blue--text(style="cursor:pointer")  {{User.name}} 
    //-     .caption.ml-auto.mt-n1.grey--text.lighten-4
    //-       v-icon(small) mdi-star
    //-       | {{ reputation }}
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

  @Prop({ default: false }) disableAvatar: any;

  @Prop({ default: false }) disableName: any;

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
