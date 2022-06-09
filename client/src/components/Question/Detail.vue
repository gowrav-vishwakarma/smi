<template>
<v-container>
    <v-row>
        <v-col cols="12"
        md="12"
        sm="12"
        >
         <QuestionSingle
            :question="question"
        />
        </v-col>
 </v-row>
</v-container>
</template>

<script>

import QuestionSingle from "@/components/Question/Single";
export default {
    props: {
        question: Object,
    },
    components:{
        QuestionSingle
    }
};
</script>
