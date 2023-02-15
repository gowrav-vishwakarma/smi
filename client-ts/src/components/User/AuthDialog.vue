<template lang="pug">
    v-dialog(v-model.sync="showDialogState" persistent max-width="320")
        v-card
            v-card-title.text-h5 Login Required
            v-card-text authentication required for this operation  
            v-card-actions
                v-spacer
                v-btn(color="grey" text  @click="showDialogState=false") close
                v-btn(color="primary" to="/login" @click="showDialogState=false") Login
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, PropSync } from "vue-property-decorator";

@Component({
  name: "AuthDialog",
})
export default class AuthDialog extends Vue {
  // @Prop({ default: false })
  // showDialog!: boolean;

  // showDialogState = false;

  @PropSync("showDialog") showDialogState!: boolean;

  @Watch("showDialog")
  onshowDialog(n: boolean, o: boolean) {
    console.log("dialog");
    this.showDialogState = n;
    // this.showDialog = !n;
  }
  mounted() {
    console.log("auth showDialog");
  }
}
</script>
