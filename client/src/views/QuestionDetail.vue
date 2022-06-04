<template>
    <div>
        Qestion Details
        <QuestionDetail :question="question" />
    </div>
</template>

<script>
import QuestionDetail from "@/components/Question/Detail";
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
        this.question = this.getQuestionDetails(this.$route.params.id);
    },

    methods: {
        getQuestionDetails(id) {
            // call api to get details
            return {
                title: "Question no " + id,
            };
        },
    },
};
</script>
