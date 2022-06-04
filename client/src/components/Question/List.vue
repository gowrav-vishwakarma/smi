<template>
    <div>
        <QuestionSingle
            v-for="(question, i) in questions"
            :question="question"
            :key="i"
        />
    </div>
</template>

<script>
import QuestionSingle from "@/components/Question/Single";

export default {
    components: {
        QuestionSingle,
    },
    props: {
        questions: Array,
    },
};
</script>
