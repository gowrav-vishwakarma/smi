<template>
   <div>
       <b>Community Answer</b>
       <v-row>
           <v-col cols="12">
                  <v-card
          class="pa-2"
          outlined
          tile
        >
        <v-row>
            <v-col cols="12">
                <p>{{answer.comment}}</p>
            </v-col>
            <!-- Delete/like -->
            <v-col md="8">
                <v-btn small class="red" @click="DeleteAns(answer._id)" v-if="userID!=null && answer.commentById==userID._id">
                <v-icon small>mdi-delete</v-icon><small>delete comment</small>
                </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <!-- info -->
            <v-col md="4"
              sm="12"
             >
             <small>
                 <v-icon small>mdi-circle</v-icon>
                 <span>
          {{answer.commentBy}} - {{answer.createdAt}}
          </span>
          </small>
            </v-col>
        </v-row>
        </v-card>
           </v-col>
       </v-row>
   </div>
</template>

<script>
import DataService from "@/services/DataService";
export default {
    data(){
        return{
            userID: this.$store.state.currentUser || null
        };
    },
    props: {
       answer : Object,
    },
    methods:{
        DeleteAns(C_id){
            DataService.DelCommunityAns(C_id)
            .then((response)=>{
                console.log(response.data)
                this.$vToastify.success("Comment deleted");
            })
            .catch((e)=>{
                console.log(e)
            })
        }
    }
};
</script>