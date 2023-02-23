<template lang="pug">
  v-container
    P Solution Attempt 
    div(style="height: 100vh")
      vue-jitsi-meet(ref="jitsiRef" domain="meet.jit.si" :options="jitsiOptions" v-if="!showRatingDialog")
    v-dialog(v-model="showRatingDialog" max-width="400")
      SolutionRatingForm
</template>

<script lang="ts">
import { Component, Mixins, Ref } from "vue-property-decorator";
import { General } from "@/mixins/general";
// import { JitsiMeet } from "@mycure/vue-jitsi-meet";
import SolutionRatingForm from "@/components/Common/SolutionRatingForm.vue";

import JitsiMeet from "@/components/Multicorder/JitsiMeet.vue";

@Component({
  name: "SolutionAttempt",
  components: {
    VueJitsiMeet: JitsiMeet,
    SolutionRatingForm,
  },
})
export default class SolutionAttempt extends Mixins(General) {
  // eslint-disable-next-line
  @Ref("jitsiRef") private jitsiRefComponent!: HTMLIFrameElement;

  showRatingDialog = false;

  get jitsiOptions() {
    return {
      roomName: this.$route.params.solutionId,
      width: "100%",
      noSSL: false,
      userInfo: {
        email: "user@email.com",
        displayName: this.$store.getters.loggedInUser._id,
      },
      personID: "wedwds",
      configOverwrite: {
        disableDeepLinking: true,
        prejoinPageEnabled: false,
        enableNoisyMicDetection: false,
        screenshotCapture: {
          enabled: true,
          mode: "always",
        },
        fileRecordingsServiceEnabled: true,
        localRecording: {
          enabled: true,
          format: "flac",
        },
        disableRemoteControl: true,
        hideConferenceTimer: true,
        remoteVideoMenu: {
          disableKick: true,
          disableGrantModerator: true,
        },
        subject: "Solving Issue Room",
      },
      interfaceConfigOverwrite: {
        FILM_STRIP_MAX_HEIGHT: "0.1",
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        TOOLBAR_ALWAYS_VISIBLE: true,
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "desktop",
          "fullscreen",
          "hangup",
          "chat",
          "settings",
          // "tileview",
        ],
      },
      onload: this.onIFrameLoad,
    };
  }

  mounted() {
    // this.jitsi = new JitsiMeetExternalAPI("meet.jit.si", this.jitsiOptions);
    // this.jitsiRef.addEventListener(
    //   "video-conference-terminated",
    //   this.onVideoConferenceLeft
    // );
  }

  onIFrameLoad(event: any) {
    console.log("callbackevent on iframe loaded callback function ", event);
    this.jitsiRefComponent.addEventListener(
      "participantJoined",
      this.onParticipantJoined
    );
    this.jitsiRefComponent.addEventListener(
      "participantLeft",
      this.onParticipantLeft
    );
    this.jitsiRefComponent.addEventListener(
      "videoConferenceLeft",
      this.onParticipantLeft
    );
  }

  onParticipantLeft(event: any) {
    console.log("callbackevent onParticipant Left roomName", event);
    this.showRatingDialog = true;
    // this.$router.push("/");
  }

  videoConferenceLeft(event: any) {
    console.log("callbackevent video conference left");
    this.showRatingDialog = true;
  }

  onParticipantJoined() {
    alert("participent joinded");
  }
}
</script>
