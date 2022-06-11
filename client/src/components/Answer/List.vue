<template>
    <v-container>
        <b>Community Answers</b>

        <v-row>
            <v-col cols="12" md="12" sm="12">
                <v-card
                    class="pa-2"
                    outlined
                    tile
                    v-if="answers.length && answers.length > 0"
                >
                    <SingleAnswer
                        v-for="(answer, key) in answers"
                        :key="key"
                        :answer="answer"
                    />
                </v-card>
            </v-col>

            <v-col cols="12" md="12" sm="12">
                <SubmitAnswer :question="question" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DataService from "@/services/DataService";
import SubmitAnswer from "@/components/Answer/Submit";
import SingleAnswer from "@/components/Answer/Single";
export default {
    data() {
        return {
            answers: {},
        };
    },
    components: {
        SubmitAnswer,
        SingleAnswer,
    },
    props: {
        question: Object,
    },
    mounted() {
        this.FetchAns();
    },
    methods: {
        FetchAns() {
            DataService.GetCommunityAns(this.question._id)
                .then((response) => {
                    console.log(response.data);
                    this.answers = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
