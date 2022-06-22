<template>

<b-tabs class="btab mb-4" content-class="mt-3">
    <b-tab title="Question Asked" active>
       <v-card class="mb-2 ml-2 mr-2" v-for="(question,key) in questions" :key="key">
           <v-card-title>
              {{question.title}}
           </v-card-title>
           <v-card-text>
             <p>{{ shortdetail(question.detail) }} <small class="text-primary" @click="goToDetail(question)">..read more</small></p>
           </v-card-text>
       </v-card>
        </b-tab>


    <b-tab title="Question Answered">
         <v-card class="mb-2 ml-2 mr-2" v-for="(answer,key) in answers" :key="key">
           <v-card-title>
              {{answer.questionId.title}}
           </v-card-title>
           <v-card-text>
             <p>{{ shortdetail(answer.questionId.detail) }} <small class="text-primary" @click="goToDetail(answer.questionId)">..read more</small></p>
           </v-card-text>
       </v-card>
        </b-tab>
</b-tabs>
</template>

<style>
.btab{
  border: 1px solid rgb(137, 136, 136);
  border-radius: 9px;  
  height: 25rem!important;
  padding: 10px;
  overflow: scroll;
}
</style>

<script>
import DataService from '@/services/DataService';
import S from 'string'

export default{
    data(){
        return{
            questions:{},
            answers:{}
        };
    },
    props:{
        currentUser: Object
    },
    mounted(){
        this.getAsked();
        this.getAnswered();
    },
    methods:{

          goToDetail(question) {
            this.$router.push(`/question/${question._id}`);
        },
         shortdetail(detail) {
            return S(detail).stripTags().truncate(100).s;
        },
        getAsked(){
            DataService.getQuestionUserbyId(this.currentUser._id)
            .then(response=>{
                this.questions = response.data;
            })
            .catch(err=>console.log(err))
        },

        getAnswered(){
            DataService.GetCommunityAnsUserbyId(this.currentUser._id)
            .then(response=>{
                console.log(response.data)
                this.answers = response.data;
            })
            .catch(err=>console.log(err))
        }
    }
}
</script>