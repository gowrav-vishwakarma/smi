<template>
    <div class="text-center">
        <v-btn v-if="$store.getters.isLoggedIn" @click="placeOffer"
            >Offer Solution</v-btn
        >
        <div v-else>Login to offer</div>
    </div>
</template>

<script>
import DataService from "@/services/DataService";
import socket from "@/socket";
export default {
    props: {
        question: Object,
    },
    data() {
        return {
            offer: {
                questionId: this.question._id,
                questionById: this.question.userId,
                // userRating: this.$store.state.currentUser.totalRatingPoints,
            },
            valid: false,
        };
    },
    methods: {
        show() {
            this.$modal.show("Offerform");
        },
        hide() {
            this.$modal.hide("my-first-modal");
        },
        placeOffer() {
            DataService.CreateOffer(this.offer)
                .then((response) => {
                    console.log(response.data);
                    this.$emit("offer-placed", this.offer);

                    this.$vToastify.success("Offer added");
                    socket.emit("offer-placed", {
                        content: {
                            questionTitle: this.question.title,
                            questionId: this.question._id,
                            questionBy: this.question.userId,
                            offerById: this.$store.state.currentUser._id,
                            offerUserName: this.$store.state.currentUser.name,
                            text: this.description,
                        },
                        to: this.question.userId,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
