<template>
    <v-card class="pa-2" outlined tile>
        <v-row>
            <v-col class="text-left" cols="9">
                <SingleOffer
                    v-for="(offer, i) in offers"
                    :offer="offer"
                    :key="i"
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import SingleOffer from "./Single.vue";
import DataService from "@/services/DataService";
export default {
    components: {
        SingleOffer,
    },
    props: {
        question: Object,
    },
    data() {
        return {
            offers: [],
        };
    },
    mounted() {
        this.FetchOffer();
    },
    methods: {
        FetchOffer() {
            DataService.GetAllOffer(this.question._id)
                .then((response) => {
                    this.offers = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
