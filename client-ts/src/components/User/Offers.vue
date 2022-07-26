<template lang="pug">
    .caption My Offers
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import userApi from "@/services/user.api";

@Component({
  name: "UserOffers",
})
export default class UserOffersComponent extends Vue {
    offers: any[] = [];

  async mounted() {
    this.offers = await userApi.getMyOffers();
    console.log(this.offers);
  }
}
</script>
