<template>
    <!-- vuetify two columns with one shorter and second bigger -->
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="3"> Bidding Component here ??? </v-col>
            <v-col cols="9">
                <QuestionDetail :question="question" />
                <div style="padding-top: 200px">
                    Public comment section here
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import QuestionDetail from "@/components/Question/Detail";
import DataService from "../services/DataService";
export default {
    components: {
        QuestionDetail,
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
