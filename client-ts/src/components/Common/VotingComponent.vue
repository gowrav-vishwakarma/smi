<template lang="pug">
    .d-flex
      v-icon(@click="voteUp" ) mdi-cog
      | {{ currentVoteCount }}
      v-icon(@click="voteDown") mdi-cog
</template>

<script lang="ts">
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import commentsApi from "@/services/comments.api";
import questionsApi from "@/services/questions.api";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VotingComponent",
})
export default class VoteingComponent extends Vue {
  @Prop({ default: null })
  readonly question!: QuestionListResponseDTO;

  @Prop({ default: null })
  readonly comment!: any;

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
    if (this.question) {
      this.voteUpQuestion();
    } else {
      this.voteUpComment();
    }
  }

  voteDown() {
    if (this.question) {
      this.voteDownQuestion();
    } else {
      this.voteDownComment();
    }
  }

  voteUpQuestion() {
    questionsApi.vote(this.question._id, "up").then(() => {
      this.question.questionValue.totalVoteCount++;
      this.question.myVote = 1;
    });
  }

  voteDownQuestion() {
    questionsApi.vote(this.question._id, "down").then(() => {
      this.question.questionValue.totalVoteCount--;
      this.question.myVote = -1;
    });
  }

  voteUpComment() {
    commentsApi.vote(this.comment._id, "up").then(() => {
      this.comment.commentValue.totalVoteCount++;
      this.comment.myVote = 1;
    });
  }

  voteDownComment() {
    commentsApi.vote(this.comment._id, "down").then(() => {
      this.comment.commentValue.totalVoteCount--;
      this.comment.myVote = -1;
    });
  }
}
</script>
