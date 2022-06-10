<template>
<div>
    <CreateOffer v-if="this.$store.state.currentUser._id != question.userId" :question="question"/>
    <v-divider></v-divider>
    <h3 class="text-center">Solution Offers</h3>
    <ListOffer v-for="(offer,key) in offers" :key="key" :offer="offer"/>
    </div>
</template>

<script>
import CreateOffer from "./Create.vue"
import DataService from "@/services/DataService"
import ListOffer from "./List.vue"
   export default{
      components:{
          CreateOffer,
          ListOffer
      },
      data(){
          return{
          offers:[]
          };
      },
      mounted(){
          this.FetchOffer()
      },
      methods:{
          FetchOffer(){
                  DataService.GetAllOffer(this.question._id)
                  .then(response=>{
                      console.log(response.data)
                      this.offers = response.data;
                  })
                  .catch(err=>{
                      console.log(err)
                  })
          }
      },
       props:{
           question:Object
       }
   }
</script>