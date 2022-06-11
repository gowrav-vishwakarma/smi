<template>
    <v-icon class="call" @click="initiateCall">mdi-phone</v-icon>
</template>

<style>
.call{
    cursor: pointer!important;
    transition: 1s all;
}
.call:hover{
   transform: rotate(10deg);
}
</style>

<script>
import socket from "@/socket";
export default {
    name: "BidCall",
    components: {},
    props: {
       offer:Object
    },

    data() {
        return {
            callingDialog: false,
            isCalling: false,
            callDeclined: false,
            callBusy: false,
        };
    },
    mounted() {
        socket.on("call-declined", ({ content }) => {
            if (content.offerById === this.offer.offerById) {
                this.callDeclined = true;
                this.isCalling = false;
            }
        });
        socket.on("call-accepted", ({ content }) => {
            if (content.offerById === this.offer.offerById) {
                this.isCalling = false;
                this.$router.push(
                    "/solution-attempt/" + content.solutionAttemptId
                );
            }
        });
    },
    methods: {
        initiateCall() {
            socket.emit("initiateCall", {
                content: {  
                    callerId: this.$store.getters.currentUser._id,
                    callerName:this.$store.getters.currentUser.name,
                    offerId: this.offer._id,
                    offerById:this.offer.offerById,
                    questionId: this.offer.questionId,
                 },
                to: this.offer.offerById,
            });
            this.callingDialog = true;
            this.isCalling = true;
        },
    },
};
</script>
