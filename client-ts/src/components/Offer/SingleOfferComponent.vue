<template lang="pug">
    v-alert(border="left" icon="mdi-fire" dense text type="success" colored-border color="deep-purple accent-4" elevation="2")
        .d-flex.justify-space-between
            | {{offer.User.name}}
            v-icon(small @click="call") mdi-phone
</template>

<script lang="ts">
import { SocketEmit } from "@/services/socket";
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SingleOfferComponent extends Vue {
  @Prop({ default: null })
  readonly offer!: any;

  call() {
    alert("Calling");
    SocketEmit("calling", {
      to: this.offer.User.id,
      from: this.offer.User.id,
    });
  }
}
</script>
