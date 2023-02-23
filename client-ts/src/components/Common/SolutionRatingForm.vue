<template lang="pug">
  div.text-center.solution-rating-form-component
      v-card(class="mx-auto elevation-16" max-width="400" )
          v-card-title(style="align-items:center;") {{title}}
          v-card-text Please take a few seconds to rate your experience. It really helps!
            v-rating( v-model="rating" color="yellow darken-3" background-color="grey darken-1" active-color="yellow-accent-4" hover size="48" length="5")
            v-textarea(label="comment" v-model="comment" outline prepend-icon="mdi-comment" rows="2")
          v-divider
          v-card-actions
            v-btn(color="primary" text block @click="submitRating") Rate Now
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import solutionsApi from "@/services/solutions.api";

@Component({
  name: "SolutionRatingForm",
  components: {},
})
export default class SolutionRatingForm extends Vue {
  @Prop({ default: null })
  readonly question!: QuestionListResponseDTO;

  rating = 0;
  comment = "";

  get title() {
    return "Rating For Questioner/Solver";
  }

  submitRating() {
    solutionsApi.createSolutionRating({
      rating: this.rating,
      comment: this.comment,
      solutionAttemptId: this.$route.params.solutionId,
    });
  }
}
</script>
