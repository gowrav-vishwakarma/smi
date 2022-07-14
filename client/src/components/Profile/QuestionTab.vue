<template>
<div class="d-flex flex-column justify-space-between questab">
    <div class="d-flex flex-row justify-space-around ml-8 mr-8 mt-3">
        <v-btn class="buttons" @click="Ishow1">Question Asked</v-btn>
        <v-btn class="buttons" @click="Ishow2">Question Answered</v-btn>
    </div>
    <v-divider></v-divider>
    <div v-if="show1">
       <v-card class="mb-2 ml-2 mr-2" v-for="(question,key) in questions" :key="key">
           <v-card-title>
              {{question.title}}
           </v-card-title>
           <v-card-text>
             <p>{{ shortdetail(question.detail) }} <small class="text-primary" @click="goToDetail(question)">..read more</small></p>
           </v-card-text>
       </v-card>
        </div>


    <div v-if="show2">
         <v-card class="mb-2 ml-2 mr-2" v-for="(answer,key) in answers" :key="key">
           <v-card-title>
              {{answer.questionId.title}}
           </v-card-title>
           <v-card-text>
             <p>{{ shortdetail(answer.questionId.detail) }} <small class="text-primary" @click="goToDetail(answer.questionId)">..read more</small></p>
           </v-card-text>
       </v-card>
        </div>
     </div>
</template>

<style>
.questab{  
box-sizing: border-box;
width: 730px;
height: 454px;
text-align: center;
overflow: scroll;
background: #FBFBFB;
border: 1px solid #EEEEEE;
box-shadow: 0px 2px 4px rgba(157, 155, 155, 0.06);
border-radius: 12px;
}

.buttons{
background: #EEEEEE;
border: 1px solid #EEEEEE;
box-shadow: 0px 2px 4px rgba(157, 155, 155, 0.06);
border-radius: 12px;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 24px;

color: #000000;
}
</style>

<script>
import DataService from '@/services/DataService';
import S from 'string'

export default{
    data(){
        return{
            questions:{},
            answers:{},
            show1:true,
            show2:false
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
       Ishow1(){
        this.show1 = true;
        this.show2 = false;
       },

       Ishow2(){
        this.show1 = false;
        this.show2 = true;
        },
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
                this.answers = response.data;
            })
            .catch(err=>console.log(err))
        }
    }
}
</script>