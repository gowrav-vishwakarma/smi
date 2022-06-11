<template>
    <div>
        <InitialOffer :question="question" />
        <CreateOffer :question="question" v-if="!isMyQuestion(question)" />
        <v-divider></v-divider>
        <h3 class="text-center">Solution Offers</h3>
        <ListOffer :question="question" />
    </div>
</template>

<script>
import InitialOffer from "@/components/Offer/InitialOffer.vue";
import CreateOffer from "./Create.vue";
import ListOffer from "./List.vue";

export default {
    components: {
        InitialOffer,
        CreateOffer,
        ListOffer,
    },
    props: {
        question: Object,
    },
};
</script>
