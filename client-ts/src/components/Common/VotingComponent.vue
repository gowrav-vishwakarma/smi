<template lang="pug">
    div
      .d-flex
          v-tooltip(top)
            template( v-slot:activator="{ on, attrs }")
              v-icon.mx-2(@click="voteUp" x-small v-bind="attrs" v-on="on") mdi-thumb-up
            span happy with question, vote up
          span.text-caption {{ currentVoteCount }}
          v-tooltip(top)
            template( v-slot:activator="{ on, attrs }")
              v-icon.mx-2(@click="voteDown" x-small v-bind="attrs" v-on="on") mdi-thumb-down
            span unhappy with question, vote dowm
      auth-dialog(:showDialog="AuthDialogState")
</template>

<script lang="ts">
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import commentsApi from "@/services/comments.api";
import questionsApi from "@/services/questions.api";
import { Component, Prop, Vue } from "vue-property-decorator";
import AuthDialog from "@/components/User/AuthDialog.vue";
import { nextTick } from "vue/types/umd";

@Component({
  name: "VotingComponent",
  components: {
    AuthDialog,
  },
})
export default class VoteingComponent extends Vue {
  @Prop({ default: null })
  readonly question!: QuestionListResponseDTO;

  @Prop({ default: null })
  readonly comment!: any;

  AuthDialogState = false;

  get currentVoteCount() {
    if (this.question) {
      return this.question.questionValue.totalVoteCount;
    } else {
      return this.comment.commentValue.totalVoteCount;
    }
  }

  get myVote() {
    if (this.question) {
      return this.question.myVote;
    } else {
      return this.comment.myVote;
    }
  }

  voteUp() {
    if (!this.$store.getters.isAuthenticated) {
      this.AuthDialogState = true;
      return;
    }

    if (this.question) {
      this.voteUpQuestion();
    } else {
      this.voteUpComment();
    }
  }

  voteDown() {
    if (!this.$store.getters.isAuthenticated) {
      this.AuthDialogState = true;
      return;
    }

    if (this.question) {
      this.voteDownQuestion();
    } else {
      this.voteDownComment();
    }
  }

  voteUpQuestion() {
    /** todo
     * 1 check login condition
     *    false then redirect to login page
     * 2 question is not created by self
     */

    if (!this.$store.getters.isAuthenticated) {
      this.AuthDialogState = true;
      return;
    }

    questionsApi.vote(this.question._id, "up").then(() => {
      this.question.questionValue.totalVoteCount++;
      this.question.myVote = 1;
    });
  }

  voteDownQuestion() {
    if (!this.$store.getters.isAuthenticated) {
      this.AuthDialogState = true;
      return;
    }

    questionsApi.vote(this.question._id, "down").then(() => {
      this.question.questionValue.totalVoteCount--;
      this.question.myVote = -1;
    });
  }

  voteUpComment() {
    if (!this.$store.getters.isAuthenticated) {
      this.AuthDialogState = true;
      return;
    }

    commentsApi.vote(this.comment._id, "up").then(() => {
      this.comment.commentValue.totalVoteCount++;
      this.comment.myVote = 1;
    });
  }

  voteDownComment() {
    if (!this.$store.getters.isAuthenticated) {
      this.AuthDialogState = true;
      return;
    }

    commentsApi.vote(this.comment._id, "down").then(() => {
      this.comment.commentValue.totalVoteCount--;
      this.comment.myVote = -1;
    });
  }
}
</script>
