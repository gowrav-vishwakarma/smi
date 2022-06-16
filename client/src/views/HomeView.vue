<template>
    <v-container>
        <h3 style="border-bottom: 1px solid">Top Questions</h3>
        <v-row class="mt-5 mb-5">
            <QuestionList :questions="questions" />
        </v-row>
        <v-layout style="border-top: 1px solid" class="pt-2">
            <v-flex xs12>
                <v-btn
                    class="primary"
                    @click="prevPage"
                    :disabled="!hasPrevPage"
                    :class="{
                        disabled: !hasPrevPage,
                        active: hasPrevPage,
                    }"
                    :style="{
                        'margin-right': '10px',
                    }"
                >
                    Previous
                </v-btn>
                <v-btn
                    class="primary"
                    @click="nextPage"
                    :disabled="!hasNextPage"
                    :class="{
                        disabled: !hasNextPage,
                        active: hasNextPage,
                    }"
                    :style="{
                        'margin-left': '10px',
                    }"
                >
                    Next
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import QuestionList from "@/components/Question/List";
import DataService from "../services/DataService";

export default {
    components: {
        QuestionList,
    },
    data() {
        return {
            questions: [],
            showNext: false,
            showPrevious: false,
            currentPage: 1,
            questionsPerPage: 10,
            hasNextPage: false,
            hasPrevPage: false,
        };
    },
    mounted() {
        this.getQuestionsFromApi();
    },
    methods: {
        getQuestionsFromApi() {
            DataService.getQuestions(
                this.$store.getters.filters,
                this.currentPage,
                this.questionsPerPage,
                this.$store.getters.sortBy
            )
                .then((response) => {
                    console.log(response.data);
                    this.questions = response.data;
                    this.hasNextPage =
                        response.data.length === this.questionsPerPage;
                    this.hasPrevPage = this.currentPage > 1;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        nextPage() {
            this.currentPage++;
            this.getQuestionsFromApi();
        },
        prevPage() {
            this.currentPage--;
            this.getQuestionsFromApi();
        },
    },
};
</script>
