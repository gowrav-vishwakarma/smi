<template>
  <v-icon small @click="call" :color="isConnected ? 'green' : 'red'"
    >mdi-circle</v-icon
  >
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import socket, { SocketOn, SocketEmit } from "@/services/socket";
import { SocketAuthDTO, InitiateCallDTO } from "@/types/ws.dto";

@Component({
  name: "WSManager",
})
export default class WSManager extends Vue {
  isConnected = false;

  mounted() {
    this.socketConnect();
  }

  socketConnect() {
    if (!this.$store.getters.isAuthenticated) {
      console.log("Not connecting to socket because user is not authenticated");
      return;
    }
    const username = this.$store.getters.loggedInUser._id;

    socket.auth = { username };
    socket.connect();

    SocketOn(
      "session",
      (data: any) => {
        socket.auth = { username };
        this.isConnected = true;
      },
      SocketAuthDTO
    );
    // socket.on("session", ({ username }) => {
    //   socket.auth = { username };
    //   this.isConnected = true;
    // });

    socket.on("call-received", (payload) => {
      console.log("call-received", payload);
    });

    // socket.on("call-received", ({ from, content }) => {
    //   if (this.$store.getters.onlineStatus === "busy") {
    //     this.sendBusy();
    //     return;
    //   }
    //   this.from = content.callerName;
    //   this.offerById = content.offerById;
    //   this.offerId = content.offerId;
    //   // this.ringing = true;
    //   this.caller = content.callerId;
    //   // var audio = new Audio(this.soundurl);
    //   // audio.play();
    //   console.log("Call received from ", from, content);

    //   this.$vToastify
    //     .prompt({
    //       body: "Call received from " + content.callerName,
    //       answers: { Accept: true, Denied: false },
    //     })
    //     .then((callAccept) => {
    //       if (callAccept) this.acceptCall();
    //       else this.declineCall();
    //     });
    // });

    // socket.on("offer-placed", ({ content }) => {
    //   let message =
    //     content.offerUserName +
    //     " placed a offer on'" +
    //     content.questionTitle +
    //     "'";
    //   this.$vToastify
    //     .prompt({
    //       body: message,
    //       answers: { "Go to question": true, Close: false },
    //     })
    //     .then((gotoPage) => {
    //       if (gotoPage) {
    //         this.$router.push("/question/" + content.questionId);
    //       }
    //     });

    //   // this.offerPlaced.push(content);
    //   console.log("Offer Placed from ", content.offerUserName, content);
    // });

    socket.on("connect_error", (err) => {
      console.error(err);
    });
  }

  call() {
    SocketEmit(
      "initiateCall",
      {
        content: "Hi There",
        to: "62bb11d860a89d6ed2a56596",
      },
      InitiateCallDTO
    );
  }
}
</script>
