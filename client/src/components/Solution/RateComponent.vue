<template>
<v-container>
      <v-row
            v-if="isMyQuestion()"
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
                    :label="solverRatingLabel"
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
                    :label="questionerRatingLable"
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

        },
        denySolution(){

        },
        giveRating(){

        },
        isMyQuestion(){
            return this.$store.getters.currentUser && (this.$store.getters.currentUser._id == this.MeetingDetails.questionById);
        },
        isMyOffer(){
            return this.$store.getters.currentUser && (this.$store.getters.currentUser._id == this.MeetingDetails.offerById);
        }
    }
}
</script>        