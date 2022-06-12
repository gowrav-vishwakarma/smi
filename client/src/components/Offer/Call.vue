<template>
    <span>
        <v-btn large icon @click="initiateCall" v-if="!isThisMyOffer(offer)">
            <v-icon> mdi-phone </v-icon>
        </v-btn>
        <v-dialog v-model="callingDialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Calling : {{ offer.offerBy }}
                </v-card-title>

                <v-card-text v-if="isCalling"> Calling ... </v-card-text>
                <v-card-text v-if="callDeclined">
                    Calling Declined
                </v-card-text>
                <v-card-text v-if="callBusy"> Call Busy </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="declineCall">
                        HangUp
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </span>
</template>

<style>
.call {
    cursor: pointer !important;
    transition: 1s all;
}
.call:hover {
    transform: rotate(10deg);
}
</style>

<script>
import socket from "@/socket";
export default {
    name: "OfferCall",
    components: {},
    props: {
        offer: Object,
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
            if (content.offerId === this.offer._id && !this.callBusy) {
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
                    callerName: this.$store.getters.currentUser.name,
                    offerId: this.offer._id,
                    offerById: this.offer.offerById,
                    questionId: this.offer.questionId,
                },
                to: this.offer.offerById,
            });
            this.callingDialog = true;
            this.isCalling = true;
        },
        declineCall() {
            this.ringing = false;
            this.callingDialog = false;
            this.callBusy = true;
            socket.emit("call-declined", {
                content: {
                    offerById: this.offerById,
                },
                to: this.offer.offerById,
            });
        },
    },
};
</script>
