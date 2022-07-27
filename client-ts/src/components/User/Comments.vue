<template lang="pug">
    div(style="width: 100%") 
      v-card.d-flex.flex-column.mb-2.pa-2(v-for="(comment,i) in comments" :key="i")
        h4.blue--text(@click="gotoDetails(comment.questionId)" style="cursor:pointer") Go to Question 
        p.mt-3
        .caption {{ shortdetail(comment.comment) }}
        small.mt-2
        .caption.ml-auto.grey--text.lighten-4 asked {{ humanized_time_span(comment.createdAt) }}
    
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { General } from "@/mixins/general";
import userApi from "@/services/user.api";
import S from "string";

@Component({
  name: "UserComments",
})
export default class UserCommentsComponent extends Mixins(General){
    comments: any[] = [];

  async mounted() {
    this.comments = await userApi.getMyComments();
    console.log(this.comments);
  }

  gotoDetails(questionId:string) {
    this.$router.push("question/" + questionId);
  } 
  
  shortdetail(detail:string) {
    return S(detail).stripTags().truncate(100).s;
  }
}
</script>
