<template>
    <v-card class="pa-2" outlined tile>
        <v-card-text class="mx-2">Your answer/comment</v-card-text>
        <vue-editor class="mt-2" v-model="comment"></vue-editor>
        <v-btn v-if="userData" @click="subAns" class="mt-3"
            >Submit Answer</v-btn
        >
        <v-btn v-if="!userData" @click="goToLog">Login to Answer</v-btn>
    </v-card>
</template>

<script>
import { VueEditor } from "vue2-editor";
import DataService from "@/services/DataService";
export default {
    data() {
        return {
            userData: this.$store.state.currentUser,
            comment: "",
            Q_id: this.question._id,
        };
    },
    components: {
        VueEditor,
    },
    props: {
        question: Object,
    },
    methods: {
        goToLog() {
            this.$router.push(`/login`);
        },
        subAns() {
            var data = {
                questionId: this.question._id,
                comment: this.comment,
            };
            DataService.CreateCommunityAns(data)
                .then((response) => {
                    console.log(response.data);
                    this.$vToastify.success("Comment added");
                    this.$emit("comment-submitted", this.comment);
                    this.comment = "";
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
