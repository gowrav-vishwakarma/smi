<template>
    <div class="text-center">
        <v-btn @click="placeOffer">Offer Solution</v-btn>
        <modal name="Offerform">
            <v-form ref="form" v-model="valid">
                <v-text-field
                    label="Optional comment"
                    v-model="offer.description"
                    :rules="[
                        (v) => !!v || 'Required',
                        (v) => v.length <= 50 || 'Too long',
                    ]"
                ></v-text-field>

                <v-btn
                    color="success"
                    class="mt-0"
                    @click="placeOffer"
                    :disabled="!valid"
                    block
                >
                    Create
                </v-btn>
            </v-form>
        </modal>
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
                userRating: this.$store.state.currentUser.totalRatingPoints,
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
                    this.$vToastify.success("Offer added");
                })
                .catch((e) => {
                    console.log(e);
                });

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
            this.hide();
        },
    },
};
</script>
