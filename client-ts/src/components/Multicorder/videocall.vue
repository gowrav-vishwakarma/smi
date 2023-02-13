<template lang="pug">
    v-container
        | source 
        video(ref="localVideo" autoplay style="width:100%")
        | Destination
        video(ref="remoteVideo" autoplay muted="true" playsinline="true" style="width:100%")
        v-btn(@click="start") Start
        v-btn(@click="createSimplePeerConnection") Start with data channle
        v-btn(@click="disconnect") disconnect
        //- v-btn(@click="hangup") disconnect
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { SocketEmit, SocketOn } from "@/services/socket";
import SimplePeer from "simple-peer";
// import adapter from "webrtc-adapter";

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

  localStream!: MediaStream;
  remoteStream!: MediaStream;
  localPeerConnection!: RTCPeerConnection;
  remotePeerConnection!: RTCPeerConnection;
  dataChannel!: RTCDataChannel;
  counter = 0;
  otherId: any = "";

  configuration = {
    // iceServers: [
    //   { urls: "stun:stun.l.google.com:19302" },
    //   {
    //     urls: "turn:numb.viagenie.ca",
    //     username: "webrtc@live.com",
    //     credential: "muazkh",
    //   },
    // ],
    iceServers: [{ urls: "stun:stun.1.google.com:19302" }],
  };

  mounted() {
    this.localPeerConnection = new RTCPeerConnection(this.configuration);
    this.remotePeerConnection = new RTCPeerConnection(this.configuration);

    this.start1();

    SocketOn("videocallstream", (payload) => {
      console.log("hello videocallstream", payload);
    });

    SocketOn("RtcOffer", (payload) => {
      console.log("RTC Offer receive", payload);
      if (this.remotePeerConnection) {
        this.remotePeerConnection
          .setRemoteDescription(
            new RTCSessionDescription({
              type: payload.RtcOffer.type,
              sdp: payload.RtcOffer.sdp,
            })
          )
          .then(() => this.remotePeerConnection.createAnswer())
          .then((sdp) => this.remotePeerConnection.setLocalDescription(sdp))
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
      this.localPeerConnection
        .setRemoteDescription(
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

    this.remotePeerConnection.ondatachannel = (event) => {
      console.log("Remote peer on data channel");
      let receivedDataChannel = event.channel;
      receivedDataChannel.onopen = () => {
        console.log("Data channel opened for remote");
        receivedDataChannel.send("Hello from the other side!");
      };
    };
  }

  async start() {
    // create local peerconnection

    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     this.localStream = stream;
    //     this.localVideo.srcObject = stream;
    //     // this.localVideo.play();
    //     stream.getTracks().forEach((track) => {
    //       this.localPeerConnection.addTrack(track, stream);
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    this.localPeerConnection.onicecandidate = (event) => {
      console.log("onicecandidate", event);

      if (event.candidate) {
        console.log("onicecandidate", event);
        // send the ice candidate to the other peer
      }
    };
    this.localPeerConnection.ontrack = (event) => {
      console.log("hello ontrack ...");
      this.remoteStream = event.streams[0];
      this.remoteVideo.srcObject = event.streams[0];
      // this.remoteVideo.src = window.URL.createObjectURL(event.streams[0]); // for older browsers

      // this.remoteVideo.play();
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
        this.localPeerConnection.setLocalDescription(offer);
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

  start1() {
    navigator.mediaDevices
      .getUserMedia({
        // audio: true,
        video: true,
      })
      .then((stream) => {
        this.localStream = stream;
        this.localVideo.srcObject = stream;

        stream.getTracks().forEach((track) => {
          this.localPeerConnection.addTrack(track, stream);
        });

        // this.remotePeerConnection.ontrack = (event) => {
        //   console.log("remote peer track received", event);
        //   this.remoteStream = event.streams[0];
        //   this.remoteVideo.srcObject = event.streams[0];
        //   // this.remoteVideo.srcObject = this.localStream;
        //   // let playPromise = this.remoteVideo.play();
        //   // if (playPromise !== undefined) {
        //   //   playPromise
        //   //     .then((_) => {
        //   //       // Automatic playback started!
        //   //       // Show playing UI.
        //   //     })
        //   //     .catch((error) => {
        //   //       // Auto-play was prevented
        //   //       // Show paused UI.
        //   //     });
        //   // }
        //   // Do something with the incoming track, such as adding it to a video element
        // };

        return this.localPeerConnection.createOffer();
      })
      .then((offer) => {
        if (offer !== null) {
          this.localPeerConnection.setLocalDescription(offer);
          this.remotePeerConnection.setRemoteDescription(offer);
          return this.remotePeerConnection.createAnswer();
        }
      })
      .then((answer) => {
        if (answer !== null && answer !== undefined) {
          this.remotePeerConnection.setLocalDescription(answer);
          this.localPeerConnection.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        }
      })
      .catch((error) => {
        console.error("getUserMedia error:", error);
      });

    this.localPeerConnection.ontrack = (event) => {
      console.log("local stream", event);
      // Do something with the incoming track, such as adding it to a video element
    };

    this.remotePeerConnection.ontrack = (event: RTCTrackEvent) => {
      console.log("remote peer track received", event);
      this.remoteStream = event.streams[0];
      this.remoteVideo.srcObject = event.streams[0];
      console.log(this.remoteStream);
      // if (this.counter == 0) {
      this.remoteVideo.play();
      // this.counter = 1;
      // }

      // Do something with the incoming track, such as adding it to a video element
    };

    this.localPeerConnection.onicecandidate = (
      event: RTCPeerConnectionIceEvent
    ) => {
      if (event.candidate) {
        this.remotePeerConnection.addIceCandidate(event.candidate);
      }
    };

    this.remotePeerConnection.onicecandidate = (
      event: RTCPeerConnectionIceEvent
    ) => {
      if (event.candidate) {
        this.localPeerConnection.addIceCandidate(event.candidate);
      }
    };
  }

  disconnect() {
    console.log("call disconnected");
  }

  createDataChannel() {
    console.log("createDataChannel");

    this.localPeerConnection.ondatachannel = (event) => {
      let receivedDataChannel = event.channel;
      receivedDataChannel.onopen = () => {
        console.log("Data channel opened");
        receivedDataChannel.send("Hello from the other side!");
      };
    };

    this.dataChannel =
      this.localPeerConnection.createDataChannel("myDataChannel");

    console.log(this.dataChannel);
    console.log(
      "Peer Connection",
      this.localPeerConnection.connectionState,
      this.localPeerConnection.connectionState,
      this.localPeerConnection.signalingState,
      this.localPeerConnection.getConfiguration()
    );
    addEventListener("datachannel", function () {
      console.log("datachannel event listner");
    });

    this.dataChannel.onmessage = (event) => {
      console.log("Data channel message received: ", event.data);
    };

    this.dataChannel.onopen = () => {
      console.log("Data channel opened");
      this.dataChannel.send("Hello from the other side!");
    };
  }

  createSimplePeerConnection() {
    var localpeer = new SimplePeer({
      initiator: true,
      stream: this.localStream,
    });
    var remotePeer = new SimplePeer();

    console.log("both peer created");
    localpeer.on("signal", (data) => {
      remotePeer.signal(data);
      console.log("local peer signal", data);
    });

    remotePeer.on("signal", (data) => {
      localpeer.signal(data);
      console.log("remote peer signal", data);
    });

    remotePeer.on("stream", (stream) => {
      // got remote video stream, now let's show it in a video tag
      console.log("remote stream", stream);
      if (this.remoteVideo) {
        this.remoteVideo.srcObject = stream;
        SocketEmit("RtcStream", stream);
      }
      // this.remoteVideo.src = window.URL.createObjectURL(stream); // for older browsers

      this.remoteVideo.play();
    });
  }
}
</script>
