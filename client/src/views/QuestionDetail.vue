<template>
    <!-- vuetify two columns with one shorter and second bigger -->
    <v-container grid-list-xs v-if="question._id">
        <v-row>
            <v-col cols="3">
                <v-card class="pa-2" outlined tile>
                    <LiveOfferView :question="question" />
                </v-card>
            </v-col>
            <v-col cols="9">
                <QuestionDetail :question="question" />
                <CommentList :question="question" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import QuestionDetail from "@/components/Question/Detail";
import CommentList from "@/components/Comment/List";
import LiveOfferView from "@/components/Offer/Section";
import DataService from "../services/DataService";
export default {
    components: {
        QuestionDetail,
        CommentList,
        LiveOfferView,
    },
    data() {
        return {
            question: {},
        };
    },

    mounted() {
        this.getQuestionDetails(this.$route.params.id);
    },

    methods: {
        getQuestionDetails(id) {
            DataService.getQuestionDetails(id)
                .then((response) => {
                    this.question = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
