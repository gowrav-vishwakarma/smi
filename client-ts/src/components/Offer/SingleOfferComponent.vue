<template lang="pug">
    v-card
      v-alert(border="left" icon="mdi-fire" dense type="success" colored-border color="deep-purple accent-4")
        .d-flex.justify-space-between
            | {{offer.Offerer.name}}
            v-icon(small @click="call" v-if="questionBelongsToMe && !offerCallConnected") mdi-phone
            v-icon(small @click="callDisconnect" v-if="offerCallConnected") mdi-phone-cancel
      //- videocall(:offer="offer" :question="question")
      v-card(flat v-if="offerCallConnected")
        div
          v-list-item(two-line)
            v-list-item-content
              v-list-item-title
                v-icon mdi-signal
                | Voice Connected
              v-list-item-subtitle {{offer.Offerer.name}}
        //- MulticorderUI( ref="MulticoderUI" @recorderOndataavailable="recorderOndataavailable" @delete-recording="deleteRecording" )
        .d-flex
          //- v-btn-toggle(group block)
          v-btn(text style="width:50%")
            v-icon mdi-video-box
          v-btn(text style="width:50%")
            v-icon mdi-monitor-share
      div.extra-component
        div.call-dial-ringing
          audio(ref="callDialPlayer" loop)
            source(src="@/assets/audio/callDialTone.mp3" type="audio/mpeg")
        div.call-receive-ringing
          audio(ref="callRingingPlayer" loop)
            source(src="@/assets/audio/callRingingTone.mp3" type="audio/mpeg")
</template>

<script lang="ts">
import { SocketEmit, SocketOn } from "@/services/socket";
import "reflect-metadata";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
// import MulticorderUI from "@/components/Multicorder/MulticorderUI.vue";
// import videocall from "@/components/Multicorder/videocall.vue";

@Component({
  name: "SingleOfferComponent",
  components: {
    // MulticorderUI,
    // videocall,
  },
})
export default class SingleOfferComponent extends Vue {
  @Ref() callRingingPlayer!: HTMLAudioElement;
  @Ref() callDialPlayer!: HTMLAudioElement;

  @Prop({ default: null })
  readonly offer!: any;

  @Prop({ default: null })
  readonly question!: any;

  blob = null;

  recorderOndataavailable(blob: any) {
    this.blob = blob;
    console.log("recorded data blob", blob);
  }

  deleteRecording(index: number) {
    if (index === 0) this.blob = null;
  }

  get offerBelongsToMe() {
    return this.$store.getters.loggedInUser
      ? this.offer.offererId == this.$store.getters.loggedInUser._id
      : false;
  }

  //toMe here logged in user
  get questionBelongsToMe() {
    return this.$store.getters.loggedInUser
      ? this.offer.questionerId == this.$store.getters.loggedInUser._id
      : false;
  }

  offerCallConnected = false;

  callRingingToastId!: any;

  mounted() {
    SocketOn("denyCall", (payload) => {
      this.callReset();
      console.log("call-denied", payload);
    });

    SocketOn("callAccepted", (payload) => {
      console.log("callAccepted at single offer component", payload);
      if (
        payload.offerId == this.offer._id &&
        payload.questionId == this.question._id &&
        (this.questionBelongsToMe || this.offerBelongsToMe)
      ) {
        // console.log("this.callRingingToastId", this.callRingingToastId);
        // this.$vToastify.removeToast(this.callRingingToastId);
        //todo remove specific toast based on id
        // temp removing all toast
        this.callReset();
        this.offerCallConnected = true;
        this.$router.push("/solution-attempt/" + payload.solutionOfferId);
      }
    });

    SocketOn("callDisconnected", (payload) => {
      this.callReset();
      console.log("callDisconnected", payload);
    });
  }

  callReset() {
    this.$vToastify.removeToast();
    // this.callRingingPlayer.pause();
    // this.callDialPlayer.pause();
  }

  call() {
    // this.callRingingPlayer.play();

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
      offerId: this.offer._id,
      eventDetail: {
        name: "OfferInitiateCall",
        for: "Offer",
      },
    });
  }

  callDisconnect() {
    this.callReset();
    this.offerCallConnected = false;
    SocketEmit("disconnectCall", {
      to: this.offerBelongsToMe
        ? this.$store.getters.loggedInUser
        : this.offer.Offerer._id,
      from: this.$store.getters.loggedInUser,
      offerer: this.offer.Offerer,
      questionId: this.question._id,
      questionTitle: this.question.title,
      offerId: this.offer._id,
      eventDetail: {
        name: "OfferDisconnectCall",
        for: "Offer",
      },
    });
  }
}
</script>
