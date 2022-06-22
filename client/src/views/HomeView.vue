<template>
    <div class="d-flex justify-space-between">
        <div class="mt-2">
            <DockerVue :questions="questions"/>
        </div>
        <div>
        <h3 style="border-bottom: 1px solid" class="mb-3">Top Questions</h3>
           <!-- search field -->
                 <v-combobox
                    v-model="topic"
                    :items="topics"
                    label="Search by topic"
                    prepend-icon="search"
                    multiple
                    chips
                    v-on:change="updateFilter"
                    clearable
                    :delimiters="[',']"
                    deletable-chips
                ></v-combobox>   
        <QuestionList :questions="questions" />
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
        </div>
        <div class="mt-2 d-flex justify-end ml-0">
            <TopAdsenseVue/>
        </div>
    </div>
</template>

<script>
import QuestionList from "@/components/Question/List";
import TopAdsenseVue from "@/components/UI/Top-Adsense.vue";
import DockerVue from "@/components/UI/Docker.vue";
import DataService from "../services/DataService";
import { topics } from "@/services/staticValues";

export default {
    components: {
        QuestionList,
        DockerVue,
        TopAdsenseVue
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
            topic:this.$store.state.currentUser.topic,
            topics
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
        updateFilter(){
        this.$store.commit("setCurrentTopic", this.topic);
        this.getQuestionsFromApi();
        }
    },
};
</script>
