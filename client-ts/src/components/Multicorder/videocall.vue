<template lang="pug">
    v-container
        | source 
        video(ref="localVideo" autoplay style="width:100%")
        | Destination
        video(ref="remoteVideo" autoplay style="width:100%")
        v-btn(@click="start") Start
        v-btn(@click="disconnect") disconnect
        //- v-btn(@click="hangup") disconnect
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { SocketEmit, SocketOn } from "@/services/socket";
// import SimplePeer from "simple-peer";
import adapter from "webrtc-adapter";

@Component({
  name: "videocall",
  components: {},
})
export default class MulticorderVideoCall extends Vue {
  @Ref() localVideo!: HTMLVideoElement;
  @Ref() remoteVideo!: HTMLVideoElement;

  @Prop({ default: null })
  readonly offer!: any;

  @Prop({ default: null })
  readonly question!: any;

  localStream!: MediaStream | null;
  remoteStream!: MediaStream | null;
  localPeerConnection!: RTCPeerConnection | null;
  remotePeerConnection!: RTCPeerConnection | null;
  otherId: any = "";

  mounted() {
    SocketOn("videocallstream", (payload) => {
      console.log("hello videocallstream", payload);
    });

    SocketOn("RtcOffer", (payload) => {
      console.log("RTC Offer receive", payload);
      this.remotePeerConnection = new RTCPeerConnection();
      if (this.remotePeerConnection) {
        this.remotePeerConnection
          .setRemoteDescription(
            new RTCSessionDescription({
              type: payload.RtcOffer.type,
              sdp: payload.RtcOffer.sdp,
            })
          )
          .then(() => this.remotePeerConnection!.createAnswer())
          .then((sdp) => this.remotePeerConnection!.setLocalDescription(sdp))
          .then(() => {
            payload.RtcDescription =
              this.remotePeerConnection!.localDescription;
            const from = payload.from;
            payload.from = this.offer.Offerer._id;
            payload.to = from;
            SocketEmit("RtcAnswer", payload);
          });
      }
      this.remotePeerConnection.onicecandidate = (
        event: RTCPeerConnectionIceEvent
      ) => {
        if (event.candidate) {
          console.log("RTC Candidate");
          SocketEmit("RtcCandidate", event.candidate);
        }
      };
      this.remotePeerConnection.ontrack = (event: RTCTrackEvent) => {
        this.remoteVideo.srcObject = event.streams[0];
      };
    });

    SocketOn("RtcAnswer", (payload) => {
      console.log("RTC Answer received", payload);
      this.localPeerConnection!.setRemoteDescription(
        new RTCSessionDescription({
          type: payload.RtcDescription.type,
          sdp: payload.RtcDescription.sdp,
        })
      )
        .then(() => {
          console.log("Remote description set");
          this.createDataChannel();
        })
        .catch((err) => {
          console.log("Rtc Answer Error", err);
        });
    });
  }

  async start() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.localStream = stream;
        this.localVideo.srcObject = stream;
        // this.localVideo.play();
      })
      .catch((error) => {
        console.error(error);
      });

    //calling
    // create local peerconnection
    this.localPeerConnection = new RTCPeerConnection();

    this.localPeerConnection.ontrack = (event) => {
      console.log("hello ontrack ...");
      this.remoteStream = event.streams[0];
      this.remoteVideo.srcObject = event.streams[0];
      this.remoteVideo.play();
    };

    if (this.localStream) {
      this.localPeerConnection.addTrack(
        this.localStream!.getTracks()[0],
        this.localStream!
      );
    }

    // creating offer for peer connection
    this.localPeerConnection
      .createOffer()
      .then((offer) => {
        console.log("hello offer create ...", offer);
        this.localPeerConnection!.setLocalDescription(offer);
        let payload = {
          to: this.offer.Offerer._id,
          from: this.$store.getters.loggedInUser._id,
          RtcOffer: offer,
        };
        SocketEmit("RtcOffer", payload);
      })
      .catch((error) => {
        console.error(error);
      });

    SocketOn("RtcCandidate", (payload) => {
      console.log("Rtc Candidate received", payload);
      // this.localPeerConnection!.addIceCandidate(candidate);
    });
  }

  disconnect() {
    console.log("call disconnected");
  }

  createDataChannel() {
    console.log("createDataChannel");

    this.localPeerConnection!.ondatachannel = (event) => {
      let receivedDataChannel = event.channel;
      receivedDataChannel.onopen = () => {
        console.log("Data channel opened");
        receivedDataChannel.send("Hello from the other side!");
      };
    };

    const dataChannel =
      this.localPeerConnection!.createDataChannel("myDataChannel");
    console.log(dataChannel);
    dataChannel.onmessage = (event) => {
      console.log("Data channel message received: ", event.data);
    };

    dataChannel.onopen = () => {
      console.log("Data channel opened");
      dataChannel.send("Hello from the other side!");
    };
  }
}
</script>
