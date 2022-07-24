<template>
  <div class="caption">
    <span v-html="comment.comment"></span>
    <solver-signature :User="comment.User" />
    <span class="caption ml-auto grey--text lighten-4">{{
      humanized_time_span(comment.createdAt)
    }}</span>
    <voting-component :comment="comment" />
    <v-divider />
  </div>
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
