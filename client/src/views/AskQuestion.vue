<template>
    <v-app>
        <v-main>
            <v-container>
                <QuestionAsk />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import QuestionAsk from "@/components/Question/Ask";
export default {
    name: "AskQuestionPage",
    components: {
        QuestionAsk,
    },
};
</script>
