<template>
  <div class="caption">
    <span v-html="comment.comment"></span>
    <solver-signature :User="comment.User" />
    <v-divider />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import SolverSignature from "@/components/User/Signature/AsSolver.vue";

@Component({
  name: "SingleCommentComponent",
  components: {
    SolverSignature,
  },
})
export default class SingleCommentComponent extends Vue {
  @Prop({ default: null, required: true })
  readonly comment!: any;
}
</script>
