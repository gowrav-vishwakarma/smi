<template lang="pug">
    div.text-center.share-component
      v-tooltip(top)
        template( v-slot:activator="{ on, attrs }")
          div(v-bind="attrs" v-on="on" @click="bookmark")
            v-icon.mx-2(small) mdi-share
            p.pa-0.ma-0.icon-text share
        span share
      auth-dialog(:showDialog.sync="AuthDialogState")
</template>

<script lang="ts">
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
// import commentsApi from "@/services/comments.api";
// import questionsApi from "@/services/questions.api";
import { Component, Prop, Vue } from "vue-property-decorator";
import AuthDialog from "@/components/User/AuthDialog.vue";

@Component({
  name: "ShareButton",
  components: {
    AuthDialog,
  },
})
export default class VoteingComponent extends Vue {
  @Prop({ default: null })
  readonly question!: QuestionListResponseDTO;

  AuthDialogState = false;

  bookmark() {
    if (!this.$store.getters.isAuthenticated) {
      this.AuthDialogState = true;
      return;
    }
  }
}
</script>

<style scoped>
.share-component .icon-text {
  font-size: 0.6em;
}
</style>
