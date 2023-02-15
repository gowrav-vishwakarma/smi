<template>
  <div ref="jitsiContainer" style="height: 100%; width: 100%"></div>
</template>

<script lang="ts">
/// <reference types="typescript" />

import { Vue, Component, Ref, Prop } from "vue-property-decorator";

@Component({
  name: "JitsiMeet",
})
export default class JitsiMeet extends Vue {
  @Ref("jitsiContainer") private jitsiRefContainer!: HTMLIFrameElement;

  domain = "meet.jit.si";

  @Prop()
  options = {};

  jitsiApi: any;

  mounted() {
    this.loadScript("https://meet.jit.si/external_api.js");
  }

  beforeDestroy() {
    this.removeJitsiWidget();
  }

  loadScript(src: string) {
    const scriptEl: HTMLScriptElement = document.createElement("script");
    scriptEl.src = src;
    scriptEl.async = true;
    document.querySelector("head")?.appendChild(scriptEl);
    scriptEl.addEventListener("load", () => {
      // () => {
      if (!window.JitsiMeetExternalAPI) {
        throw new Error("Jitsi Meet API not loaded");
      } else {
        console.log("jisti Meet API");
        this.embedJitsiWidget();
      }
      // }
    });
  }

  embedJitsiWidget() {
    const options = {
      ...this.options,
      parentNode: this.$refs.jitsiContainer,
    };
    this.jitsiApi = new window.JitsiMeetExternalAPI(this.domain, options);
  }

  executeCommand(command: string, ...value: any) {
    this.jitsiApi.executeCommand(command, ...value);
  }

  addEventListener(event: string, fn: any) {
    this.jitsiApi.on(event, fn);
  }

  removeJitsiWidget() {
    if (this.jitsiApi) this.jitsiApi.dispose();
  }
}
</script>
