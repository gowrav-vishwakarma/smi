<template>
<v-card
          class="pa-2"
          outlined
          tile
        >
        <v-row>
            <v-col class="text-left" cols="9">
                <UserInfo :userInfo="offer"/>
            </v-col>
            <v-col v-if="this.$store.state.currentUser._id == offer.questionById" class="3">
                <Call :user="offer"/>
            </v-col>

            <v-col v-if="this.$store.state.currentUser._id == offer.userById" class="3">
              <v-icon @click="Delete">mdi-delete-circle</v-icon>
            </v-col>
        </v-row>
        </v-card>
</template>

<script>
import UserInfo from "./Single.vue"
import DataService from "@/services/DataService"
import Call from "./Call.vue"
   export default{
       components:{
           UserInfo,
           Call
       },
       props:{
           offer:Object
       },
       methods:{
           Delete(){
               DataService.DelOffer(this.offer._id)
               .then(response=>{
                   console.log(response.data);
                   this.$vToastify.success("Offer removed");
               })
               .catch(err=>{
                   console.log(err)
               })
           }
       }
   }
</script>