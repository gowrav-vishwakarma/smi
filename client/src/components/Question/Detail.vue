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
       
       <v-col cols="12"
        md="12"
        sm="12"
        >
              <v-card
          class="pa-2"
          outlined
          tile
        >
           <b class="mx-2">Community Answer</b>
           <v-row>
               <v-col
               
               >

               </v-col>
           </v-row>
        </v-card>
       
        </v-col>

        <v-col cols="12"
        md="12"
        sm="12"
        >
              <v-card
          class="pa-2"
          outlined
          tile
        >
           <v-text class="mx-2">Your answer/comment</v-text>
           <vue-editor class="mt-2" v-model="comment"></vue-editor>
           <v-btn v-if="userData" @click="subAns" class="mt-3">Submit Answer</v-btn>
           <v-btn v-if="!userData" @click="goToLog">Login to Answer</v-btn>
        </v-card>
       
        </v-col>
 </v-row>
</v-container>
</template>

<script>

import { VueEditor } from "vue2-editor";
import QuestionSingle from "@/components/Question/Single";
import DataService from "@/services/DataService";
export default {
    data(){
        return{
            userData:this.$store.state.currentUser,
            comment:'',
            Q_id:this.question._id
        };
    },
    components: {
        VueEditor,
        QuestionSingle,
    },
    props: {
        question: Object,
    },
    mounted(){
      this.CommunityAns()
    },
    methods:{
        goToLog(){
           this.$router.push(`/login`);
        },
        CommunityAns(){
           DataService.GetCommunityAns(this.Q_id)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        subAns() {
           var data ={
                questionId: this.question._id,
                commentById: this.userData._id,
                commentBy: this.userData.name,
                comment: this.comment,
            }
            DataService.CreateCommunityAns(data)
                .then((response) => {
                    console.log(response.data);
                    this.$vToastify.success("Comment added");
                    this.comment=""
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    }
};
</script>
