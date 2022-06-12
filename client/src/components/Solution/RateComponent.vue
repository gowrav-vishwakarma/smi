<template>
<v-container>
      <v-row
            v-if="ismyquestion()"
            class="my-2 py-0 text-center"
        >
            <v-col cols="12" sm="12" md="6" lg="6" class="py-0 text-center">
                <v-subheader class="ma-0">Rate Solver</v-subheader>
                <v-slider
                    v-model="solverRating"
                    step="1"
                    max="10"
                    hint="Solver Ratings"
                    class="mr-10"
                    inverse-label
                ></v-slider>
            </v-col>
            <v-col sm="12" md="6" lg="6" class="text-center">
                <v-btn-toggle dense>
                    <v-btn color="success" @click="acceptSolution">
                        Accept Solution
                    </v-btn>
                    <v-btn color="error" @click="denySolution">
                        Denied Solution
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
        <v-row v-if="isMyOffer()" class="my-2">
            <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                <v-subheader class="ma-0">Rate Questioner</v-subheader>
                <v-slider
                    v-model="questionerRating"
                    step="1"
                    max="10"
                    hint="Solver Ratings"
                    class="mr-10"
                    inverse-label
                ></v-slider>
            </v-col>
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="6"
                class="my-0 py-0 text-center"
            >
                <v-btn dense color="success" @click="giveRating">
                    Give Rating
                </v-btn>
            </v-col>
        </v-row>
        </v-container>
        </template>

<script>
import DataService from '@/services/DataService'

export default{
    data(){
        return{
              MeetingDetails:null,
              solverRating:5,
              questionerRating:4
        }
    },
    props:{
        solutionId:String
    },
    mounted(){
       this.fetchDetail()
    },
    methods:{
        fetchDetail(){
            DataService.getSolutionDetails(this.solutionId)
            .then(response=>{
                console.log(response.data)
                this.MeetingDetails = response.data;
            })
            .catch(err=>console.log(err))
        },
        acceptSolution(){
              DataService.RatingUpdate(this.MeetingDetails.offerById,this.solverRating,true)
              .then(response=>{console.log(response.data)})
              .catch(err=>console.log(err))
                this.$vToastify.success(`You rated ${this.solverRating}`)

              this.$router.push(`/question/${this.MeetingDetails.questionId}`);
        },
        denySolution(){
              DataService.RatingUpdate(this.MeetingDetails.offerById,-1,true)
              .then(response=>{console.log(response.data)})
              .catch(err=>console.log(err))
                this.$vToastify.failed(`You depreciated the rating by 1 point`)

              this.$router.push(`/question/${this.MeetingDetails.questionId}`);

        },
        giveRating(){
              DataService.RatingUpdate(this.MeetingDetails.questionById,this.questionerRating,false)
              .then(response=>{console.log(response.data)})
              .catch(err=>console.log(err))
                this.$vToastify.success(`You rated ${this.questionerRating}`)
               this.$router.push(`/question/${this.MeetingDetails.questionId}`);

        },
        ismyquestion(){
            return this.MeetingDetails && (this.$store.getters.currentUser._id == this.MeetingDetails.questionById);
        },
        isMyOffer(){
            return this.MeetingDetails && (this.$store.getters.currentUser._id == this.MeetingDetails.offerById);
        }
    }
}
</script>        