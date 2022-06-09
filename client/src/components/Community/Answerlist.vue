<template>
<v-container>
    <v-row>
         <v-col cols="12"
        md="12"
        sm="12"
        >
              <v-card
          class="pa-2"
          outlined
          tile
        >
          <CommunityAnswer :Qid="this.question._id"/>
        </v-card>
       
        </v-col>

        <v-col cols="12"
        md="12"
        sm="12"
        >
        <SubmitAnswer :question="question"/>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import SubmitAnswer from "@/components/Community/Answer.vue"
import CommunityAnswer from "@/components/Community/CommunityAnswer.vue"
export default {
    components: {
        SubmitAnswer,
        CommunityAnswer
    },
    props: {
        question: Object,
    }
};

</script>