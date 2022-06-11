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
                        <v-list-item-title>{{ question }}</v-list-item-title>
                        <v-list-item-subtitle>{{ from }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{ bid }}</v-list-item-subtitle>
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

export default {
    data() {
        return {
            ringing: false,
            from: null,
            fromId: null,
            bid: null,
            bidId: null,
            question: null,
            questionId: null,
            soundurl:
                "http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3",
            bidsPlaced: [],
        };
    },
    created() {
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
            this.ringing = true;
            this.from = content.from;
            this.caller = content.caller;
            this.bid = content.bid;
            this.bidId = content.bidId;
            this.question = content.question;
            this.questionId = content.questionId;
            var audio = new Audio(this.soundurl);
            audio.play();
            console.log("Call received from ", from, content);
        });

        socket.on("offer-placed", ({ content }) => {
            let message =
                content.offerUserName +
                " placed a offer on'" +
                content.questionTitle +
                "'";
                const goToPage=()=>{
                    this.$router.push(
                                "/question/" + content.questionId
                            )
                }
            this.$vToastify.prompt({
                                body: message,
                                answers: { 'Go to question':goToPage, 'Close': false }
                            })
               

            // this.$snotify.confirm(message, "Offer Placed", {
            //     timeout: 0,
            //     showProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     buttons: [
            //         {
            //             text: "Visit Question",
            //             action: (toast) => {
            //                 this.$snotify.remove(toast.id);
                            // this.$router.push(
                            //     "/question/" + content.questionId
                            // );
            //             },
            //             bold: false,
            //         },
            //     ],
            // });
            this.bidsPlaced.push(content);
            console.log("Offer Placed from ", content.offerUserName, content);
        });

        socket.on("connect_error", (err) => {
            console.error(err);
        });
    },
    destroyed() {
        socket.off("connect_error");
        socket.off("call_received");
    },
    computed: {
        showBidsPlacedSnacksbars() {
            return this.bidsPlaced.length > 0;
        },
    },
    methods: {
        sendBusy() {
            this.ringing = false;
            socket.emit("call-busy", {
                content: {
                    bidId: this.bid._id,
                },
                to: this.caller,
            });
        },
        declineCall() {
            this.ringing = false;
            socket.emit("call-declined", {
                content: {
                    bidId: this.bidId,
                },
                to: this.caller,
            });
        },
        // async acceptCall() {
        //     this.ringing = false;
        //     const currentUser = this.$store.getters.currentUser;
        //     const solutionAttempt = {
        //         authUserId: new ObjectId(currentUser.authUserId),
        //         bidId: new ObjectId(this.bidId),
        //         bidderId: new ObjectId(currentUser._id),
        //         questionId: new ObjectId(this.questionId),
        //         questionBy: new ObjectId(this.caller),
        //         createdAt: new Date(),
        //         status: "attempted",
        //     };
        //     const mongodb =
        //         this.$realmApp.currentUser.mongoClient("mongodb-atlas");
        //     const collection = mongodb
        //         .db("SolutionNowDB")
        //         .collection("SolutionAttempts");
        //     const resp = await collection.insertOne(solutionAttempt);

        //     // update Bids collection by this.bidId to status "attempted" and insert solutionAttemptId in Bid.solutionAttemptId
        //     const bidsCollection = mongodb
        //         .db("SolutionNowDB")
        //         .collection("Bids");

        //     // update Bids collection by this.bidId to status "attempted" and insert solutionAttemptId in Bid.solutionAttemptIds Array
        //     await bidsCollection.updateOne(
        //         { _id: new ObjectId(this.bidId) },
        //         {
        //             $set: {
        //                 status: "attempted",
        //                 lastSolutionAttemptId: resp.insertedId,
        //             },
        //             $push: {
        //                 solutionAttemptIds: resp.insertedId,
        //             },
        //         }
        //     );

        //     socket.emit("call-accepted", {
        //         content: {
        //             bidId: this.bidId,
        //             solutionAttemptId: resp.insertedId,
        //         },
        //         to: this.caller,
        //     });
        //     this.$router.push("/solution-attempt/" + resp.insertedId);
        // },
        removeBidFromSnackBars(bidId) {
            this.bidsPlaced = this.bidsPlaced.filter(
                (bid) => bid._id !== bidId
            );
        },
    },
};
</script>
