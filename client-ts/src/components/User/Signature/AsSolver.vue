<template lang="pug">
  .signature.assolver
    .d-flex.justify-space-between
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
      //- User-Rating-As-Solver(:User="User")            
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
// import UserRatingAsSolver from "@/components/User/RatingAsSolver.vue";

@Component({
  name: "ByUserComponent",
  components: {
    UserAvatar,
    // UserRatingAsSolver,
  },
})
export default class ByUserComponent extends Vue {
  @Prop({ default: null, required: true }) User: any;

  @Prop({ default: false }) disableAvatar: any;

  @Prop({ default: false }) disableName: any;

  reputation = 0;
}
</script>
