<template lang="pug">
    v-alert(border="left" icon="mdi-fire" dense text type="success" colored-border color="deep-purple accent-4" elevation="2")
        .d-flex.justify-space-between
            | {{offer.user.name}}
            v-icon(small) mdi-phone
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SingleOfferComponent extends Vue {
  @Prop({ default: null })
  readonly offer!: any;
}
</script>
