<template>
    <v-card class="pa-2 my-1">
        <router-link class="nav-link" :to="`/userprofile/${offer.offerById}`">
        <small>
            <v-icon small>mdi-star</v-icon>
            {{ offererRating }}
        </small>
        {{ offer.offerBy.name }}
        </router-link>
        <v-btn class="tagg" @click="show" v-if="offer.description">know</v-btn>
        <modal v-if="offer.description" name="Desc">
            <p>{{ offer.description }}</p>
        </modal>
        <Call :offer="offer" />
    </v-card>
</template>

<style>
.nav-link{
    text-decoration: none;
    font-weight: 600;
}
</style>

<script>
import Call from "./Call.vue";
import DataService from "@/services/DataService";

export default {
    components: {
        Call,
    },
    props: {
        offer: Object,
    },
    methods: {
        show() {
            this.$modal.show("Desc");
        },
        Delete() {
            DataService.DelOffer(this.offer._id)
                .then((response) => {
                    console.log(response.data);
                    this.$vToastify.success("Offer removed");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    computed: {
        offererRating() {
            return this.offer.offerBy.totalQuestionerRatingCount
                ? this.offer.offerBy.questionerRatingPoint /
                      this.offer.offerBy.totalQuestionerRatingCount
                : "(New)";
        },
    },
};
</script>

<style>
.tagg {
    border-radius: 15px;
    width: auto !important;
    max-height: 1rem !important;
    background-color: rgb(222, 194, 194) !important;
    margin: 0rem 0.3rem;
    padding: 0rem !important;
    font-size: 0.6rem !important;
}
</style>
