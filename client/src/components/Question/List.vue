<template>
    <div style="width: 100%">
        <!-- <QuestionSingle
            v-for="(question, i) in questions"
            :question="question"
            :key="i"
        /> -->

        <!-- learning vuetify -->
        <Card
            v-for="(question, i) in questions"
            :question="question"
            :key="i"
        />
    </div>
</template>

<script>
//import QuestionSingle from "@/components/Question/Single";
import Card from '@/components/Question/B.vue'

export default {
    components: {
        //QuestionSingle,
        Card
    },
    props: {
        questions: Array,
    },
};
</script>
