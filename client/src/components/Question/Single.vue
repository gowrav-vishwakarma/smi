<template>
    <div style="min-height: 100px; border-bottom: 1px solid red; width: 100%">
        <h3 @click="goToDetail(question)">
            {{ question.title }}
        </h3>
        {{ question.shortDescription }}
    </div>
</template>

<script>
export default {
    props: {
        question: Object,
    },
    methods: {
        goToDetail(question) {
            this.$router.push(`/detail/${question._id}`);
        },
    },
};
</script>
