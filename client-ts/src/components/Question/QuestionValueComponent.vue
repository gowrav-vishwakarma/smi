<template lang="pug">
    .d-flex
          .caption {{ question.questionValue.totalVoteCount }} Votes, {{ question.questionValue.totalCommentsCount }} Comments, {{ question.questionValue.totalOfferingCount }} Offers
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "QuestionValueComponent",
})
export default class QuestionValue extends Vue {
  @Prop({ default: null })
  readonly question!: any;
}
</script>
