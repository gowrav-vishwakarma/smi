<template>
    <div>
        <InitialOffer :question="question" />
        <h3 class="text-center">Solution Offers</h3>
        <ListOffer :question="question" />
    </div>
</template>

<script>
import InitialOffer from "@/components/Offer/InitialOffer.vue";
import ListOffer from "./List.vue";

export default {
    components: {
        InitialOffer,
        ListOffer,
    },
    props: {
        question: Object,
    },
};
</script>
