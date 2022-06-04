<template>
    <v-container>
        <v-layout>
            <QuestionList :questions="questions" />
        </v-layout>
    </v-container>
</template>

<script>
import QuestionList from "@/components/Question/List";

export default {
    components: {
        QuestionList,
    },
    data() {
        return {
            questions: [],
        };
    },
    mounted() {
        this.questions = this.getQuestionsFromApi();
    },
    methods: {
        getQuestionsFromApi() {
            return [
                {
                    title: "Q1",
                    shortDescription: "hello there",
                },
                {
                    title: "Q2",
                    shortDescription: "hello there 2",
                },
            ];
        },
    },
    computed: {
        usersFromStore() {
            console.log(this.$store.state.data);
            return this.$store.state.data;
        },
    },
};
</script>
