<template lang="pug">
  v-sheet(v-if="questionComments")
    comment-create(:question="question")
    v-divider.mt-3
    comment-single(v-for="singleComment in questionComments" :comment="singleComment" :key="singleComment._id")
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import { General } from "@/mixins/general";
import questionsApi from "@/services/questions.api";
import CommentSingle from "@/components/Comments/Single.vue";
import CommentCreate from "@/components/Comments/Create.vue";

@Component({
  name: "QuestionCommentsListComponent",
  components: {
    CommentSingle,
    CommentCreate,
  },
})
export default class QuestionCommentsListComponent extends Mixins(General) {
  @Prop({ default: null })
  readonly question!: any;

  questionComments: any[] = [];

  async mounted() {
    this.questionComments = await questionsApi.getComments(this.question._id);
  }
}
</script>
