<template>
    <!-- vuetify two columns with one shorter and second bigger -->
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="3">
                 <v-card
          class="pa-2"
          outlined
          tile
        >
        BID COMPONENT HERE?
        </v-card>
            </v-col>
            <v-col cols="9">
                <QuestionDetail :question="question" />
                <CommunityAnswer :question="question"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import QuestionDetail from "@/components/Question/Detail";
import CommunityAnswer from "@/components/Community/CommunityAnswer"
import DataService from "../services/DataService";
export default {
    components: {
        QuestionDetail,
        CommunityAnswer
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
