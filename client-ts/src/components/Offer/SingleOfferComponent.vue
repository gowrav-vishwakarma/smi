<template lang="pug">
    v-alert(border="left" icon="mdi-fire" dense text type="success" colored-border color="deep-purple accent-4" elevation="2")
        .d-flex.justify-space-between
            | {{offer.Offerer.name}}
            v-icon(small @click="call") mdi-phone
</template>

<script lang="ts">
import { SocketEmit, SocketOn } from "@/services/socket";
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SingleOfferComponent extends Vue {
  @Prop({ default: null })
  readonly offer!: any;

  @Prop({ default: null })
  readonly question!: any;

  mounted() {
    SocketOn("denyCall", (payload) => {
      console.log("call-denied", payload);
    });
    SocketOn("acceptCall", (payload) => {
      console.log("call-accepted", payload);
    });
  }

  call() {
    this.$vToastify
      .prompt({
        title: `calling ${this.offer.Offerer.name}`,
        body: `ringing ...`,
        answers: { Hangup: true },
      })
      .then((hangup: boolean) => {
        console.log(hangup);
      });
    SocketEmit("initiateCall", {
      to: this.offer.Offerer._id,
      from: this.$store.getters.loggedInUser,
      offerer: this.offer.Offerer,
      questionId: this.question._id,
      questionTitle: this.question.title,
    });
  }
}
</script>
