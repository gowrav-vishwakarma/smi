<template>
    <v-card class="pa-2" outlined tile>
        <CreateOffer
            :question="question"
            v-if="!isMyQuestion(question)"
            @offer-placed="FetchOffer()"
        />

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
import CreateOffer from "./Create.vue";

export default {
    components: {
        SingleOffer,
        CreateOffer,
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
                    console.log(response.data);
                    this.offers = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
