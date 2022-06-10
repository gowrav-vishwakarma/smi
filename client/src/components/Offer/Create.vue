<template>
<div class="text-center">
<v-btn @click="show">Offer Solution</v-btn>
     <modal name="Offerform">
        <v-form ref="form" v-model="valid">
        
                <v-text-field
                    label="Optional comment"
                    v-model="offer.description"
                    :rules="[
                        (v) => !!v || 'Required',
                        (v) => v.length <= 50 || 'Too long',
                    ]"
                ></v-text-field>
               
              <v-btn
                color="success"
                class="mt-0"
                @click="placeOffer"
                :disabled="!valid"
                block
            >
                Create
            </v-btn>
        </v-form>
    </modal>
    </div>
</template>

<script>
import DataService from '@/services/DataService';
import socket from "@/socket"
   export default{
       data(){
           return{
               offer:{
                  questionId:this.question._id,
                  description:'',
                  questionById:this.question.userId,
                  userRating:this.$store.state.currentUser.totalRatingPoints
                },
                valid:false
           };
       },
       methods:{
           show () {
            this.$modal.show('Offerform');
        },
        hide () {
            this.$modal.hide('my-first-modal');
        },
        placeOffer(){
                  DataService.CreateOffer(this.offer)
                   .then((response) => {
                    console.log(response.data);
                    this.$vToastify.success("Offer added");
                })
                .catch((e) => {
                    console.log(e);
                });

              socket.emit("bid-placed", {
                content: {
                    questionTitle: this.question.title,
                    questionId: this.question._id,
                    questionBy: this.question.user._id,
                    bidderId: this.$store.state.currentUser._id,
                    bidderName: this.$store.state.currentUser.name,
                    text: this.description
                },
                to: this.question.user._id,
            });
                this.hide()
               }
       },
       props:{
           question:Object
       }
   }
</script>