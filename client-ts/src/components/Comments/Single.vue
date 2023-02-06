<template lang="pug">
  div.question-answer-list.mt-2.pa-2
    .d-flex.answer-list-section
      div
        //- v-avatar.mt-1(color="primary" size="40")
        //-   v-icon mdi-account
        solver-signature(:User="comment.User" disableName="true")
      div.pa-1
      div(style="width:100%;")
        v-card.answer-card(style="width:100%;")
          .d-flex.pr-2
            solver-signature(:User="comment.User" disableAvatar="true")
            div.ml-auto() ...
          v-card-text.ma-0.pa-1.pb-0
            div.custom-html.pa-0.ma-0(v-html="comment.comment")
        voting-component(:comment="comment")
          //- div(class="caption")
          //-   span(v-html="comment.comment")
          //-     span.caption.ml-auto.grey--text.lighten-4
          //-       {{humanized_time_span(comment.createdAt)}}
          //-   voting-component():comment="comment")
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Mixins, Prop } from "vue-property-decorator";
import SolverSignature from "@/components/User/Signature/AsSolver.vue";
import VotingComponent from "@/components/Common/VotingComponent.vue";
import { General } from "@/mixins/general";

@Component({
  name: "SingleCommentComponent",
  components: {
    SolverSignature,
    VotingComponent,
  },
})
export default class SingleCommentComponent extends Mixins(General) {
  @Prop({ default: null, required: true })
  readonly comment!: any;
}
</script>

<style>
.custom-html p {
  all: unset;
  margin-bottom: 0px !important;
}
</style>
