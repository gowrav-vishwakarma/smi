<template lang="pug">
    v-card.d-flex.flex-column(flat tile)
        v-card-text Your answer/comment
          vue-editor.mt-2(v-model="comment")
        v-card-action.pl-3.pr-3
          v-btn(block @click="submitComment" color="primary") Submit Answer
    //- <v-btn v-if="!userData" @click="goToLog">Login to Answer</v-btn>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";
import commentsAPIService from "@/services/comments.api";

@Component({
  name: "CreateCommentComponent",
  components: {
    VueEditor,
  },
})
export default class CreateCommentComponent extends Vue {
  @Prop({ default: null })
  readonly question!: any;

  comment = "";

  submitComment() {
    commentsAPIService
      .createComment(this.question._id, this.comment)
      .then(() => {
        this.comment = "";
      });
  }
}
</script>
