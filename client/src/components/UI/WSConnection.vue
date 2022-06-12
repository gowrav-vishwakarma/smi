<template>
    <v-menu
        v-if="ringing"
        v-model="ringing"
        :close-on-content-click="false"
        :nudge-width="200"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" text v-bind="attrs" v-on="on">Tring</v-btn>
        </template>
        <v-card>
            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>{{ from }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="declineCall"> Cancel </v-btn>
                <v-btn color="primary" text @click="acceptCall"> Accept </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import socket from "@/socket";
import DataService from "@/services/DataService";

export default {
    data() {
        return {
            ringing: false,
            from: null,
            caller: null,
            fromId: null,
            offerId: null,
            offerById: null,
            questionId: null,
            soundurl:
                "http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3",
        };
    },
    created() {
        this.socketConnect();
    },
    destroyed() {
        socket.off("connect_error");
        socket.off("call_received");
    },
    computed: {
        showBidsPlacedSnacksbars() {
            return this.bidsPlaced.length > 0;
        },
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
    },
    watch: {
        isLoggedIn: function (newValue) {
            if (newValue) {
                this.socketConnect();
            }
        },
    },
    methods: {
        socketConnect() {
            if (!this.$store.getters.isLoggedIn) {
                console.log(
                    "Not connecting to socket because user is not authenticated"
                );
                return;
            }
            const username = this.$store.getters.currentUser._id;
            const sessionID = localStorage.getItem("sessionID");

            if (sessionID) {
                socket.auth = { username, sessionID };
                socket.connect();
            } else {
                socket.auth = { username };
                socket.connect();
            }

            socket.on("session", ({ sessionID, userID }) => {
                // attach the session ID to the next reconnection attempts
                socket.auth = { username, sessionID };
                // store it in the localStorage
                localStorage.setItem("sessionID", sessionID);
                // save the ID of the user
                socket.userID = userID;
            });

            socket.on("call-received", ({ from, content }) => {
                if (this.$store.getters.onlineStatus === "busy") {
                    this.sendBusy();
                    return;
                }
                this.from = content.callerName;
                this.offerById = content.offerById;
                this.offerId = content.offerId;
                // this.ringing = true;
                this.caller = content.callerId;
                // var audio = new Audio(this.soundurl);
                // audio.play();
                console.log("Call received from ", from, content);

                this.$vToastify
                    .prompt({
                        body: "Call received from " + content.callerName,
                        answers: { Accept: true, Denied: false },
                    })
                    .then((callAccept) => {
                        if (callAccept) this.acceptCall();
                        else this.declineCall();
                    });
            });

            socket.on("offer-placed", ({ content }) => {
                let message =
                    content.offerUserName +
                    " placed a offer on'" +
                    content.questionTitle +
                    "'";
                this.$vToastify
                    .prompt({
                        body: message,
                        answers: { "Go to question": true, Close: false },
                    })
                    .then((gotoPage) => {
                        if (gotoPage) {
                            this.$router.push(
                                "/question/" + content.questionId
                            );
                        }
                    });

                // this.offerPlaced.push(content);
                console.log(
                    "Offer Placed from ",
                    content.offerUserName,
                    content
                );
            });

            socket.on("connect_error", (err) => {
                console.error(err);
            });
        },
        sendBusy() {
            this.ringing = false;
            socket.emit("call-busy", {
                content: {
                    offerById: this.offerById,
                },
                to: this.caller,
            });
        },
        declineCall() {
            this.ringing = false;
            socket.emit("call-declined", {
                content: {
                    offerById: this.offerById,
                },
                to: this.caller,
            });
        },
        async acceptCall() {
            this.ringing = false;
            const solutionAttempted = await DataService.getSolutionAttemptId(
                this.offerId
            );

            console.log(solutionAttempted);

            socket.emit("call-accepted", {
                content: {
                    offerId: this.offerId,
                    offerById: this.offerById,
                    solutionAttemptId: solutionAttempted.data._id,
                },
                to: this.caller,
            });

            this.$router.push(
                "/solution-attempt/" + solutionAttempted.data._id
            );
        },
        removeBidFromSnackBars(bidId) {
            this.bidsPlaced = this.bidsPlaced.filter(
                (bid) => bid._id !== bidId
            );
        },
    },
};
</script>
