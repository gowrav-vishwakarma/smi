<template lang="pug">
    div(style="width: 100%") 
      v-card.d-flex.flex-column.mb-2.pa-2(v-for="(offer,i) in offers" :key="i")
        h4.blue--text(@click="gotoDetails(offer.questionId)" style="cursor:pointer") Go to Question 
        p.mt-3
        .caption {{ offer.notes }}
        span.mt-2
        .caption.ml-auto.grey--text.lighten-4 asked {{ humanized_time_span(offer.createdAt) }}
    
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { General } from "@/mixins/general";
import userApi from "@/services/user.api";

@Component({
  name: "UserOffers",
})

export default class UserOffersComponent extends Mixins(General) {
    offers: any[] = [];
   
  gotoDetails(questionId:string) {
    this.$router.push("question/" + questionId);
  } 

  async mounted() {
    this.offers = await userApi.getMyOffers();
    console.log(this.offers);
  }
}
</script>
