<template lang="pug">
    v-card.d-flex.flex-column
        v-card-text Your answer/comment
            vue-editor.mt-2(v-model="comment")
        v-btn.mt-3(@click="submitComment" color="primary") Submit Answer
    //- <v-btn v-if="!userData" @click="goToLog">Login to Answer</v-btn>
</template>

<script lang="ts">
import questionsApi from "@/services/questions.api";
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";

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
    questionsApi.createComment(this.question._id, this.comment).then(() => {
      this.comment = "";
    });
  }
}
</script>
