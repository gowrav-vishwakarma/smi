<template>
  <v-container class="grey lighten-5">
    <v-row>
        <!-- left-part -->
      <v-col
        sm="12"
        lg="3"
        xl="3"
        md="3"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
         <v-row>
             <v-col
             col="12"
             >
             <v-card
          class="pa-2"
          outlined
          tile
        >
        <v-row>
        <v-col cols="auto" md="auto">{{question.totalBids}} Bids</v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
            <v-btn class="primary tag">{{question.status}}</v-btn>
        </v-col>
        </v-row>
        </v-card>
             </v-col>
         </v-row>

         <v-row>
             <v-col
             col="12"
             >
             <v-card
          class="pa-2"
          outlined
          tile
        >
         <v-icon class="icon" small>mdi-chat</v-icon>
         <v-icon class="icon" v-if="question.canDoVideoCall" small>mdi-video</v-icon>
         <v-icon class="icon" v-if="question.canShareScreen" small>mdi-monitor</v-icon>
         <v-icon class="icon" v-if="!question.isPaid" medium>mdi-cash</v-icon>
         
       
        </v-card>
             </v-col>
         </v-row>

         <v-row>
             <v-col
             col="12"
             >
           
        <v-btn class="success btn">
            Add to Daily Goals
        </v-btn>
        <b class="ml-2" v-if="!question.isPaid">PAID $</b>
             </v-col>
         </v-row>
        </v-card>
      </v-col>

      <!-- right-part -->
    <v-col
        cols="12"
        md="9"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >

         <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
           <h3 @click="goToDetail(question)">
            {{ question.title }}
        </h3>
        </v-card>
      </v-col>
      </v-row>

         <v-row>
      <v-col
        cols="12"
        md="10"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
           {{ question.detail }}
        </v-card>
      </v-col>
      <v-spaceer></v-spaceer>
      <v-col
        cols="2"
      >
        <video width="100%" v-if="Video" :src="Video"></video>
  
      </v-col>
      </v-row>

         <v-row>
      <v-col>
        <v-btn class="tag" v-for="tag in question.tags" :key="tag">
        {{ tag }}
        </v-btn>
      </v-col>

      <v-spacer></v-spacer>

      <v-col>
           <v-icon small>mdi-circle</v-icon>
          {{question.by}} - 
          <span class="language">
          [<i v-for="l in question.languages" :key="l">
             {{l}}
          </i>] - {{question.createdAt}}
          </span>
      </v-col>
    </v-row>

  
        </v-card>
      </v-col>
    </v-row>
</v-container>
    
</template>
<style>
h3:hover{
  cursor: pointer;
}
.language{
    font-size: .6rem;
}
.icon{
    color: rgb(81, 128, 11)!important;;
    margin: 0 .2rem;
}
.btn{
    width: 100%;
}
.tag{
    border-radius: 15px;
    width: auto!important;
    max-height: 1rem!important;
    background-color: orange!important;;
    margin: 0rem .3rem;
    padding: 0rem!important;
    font-size: .6rem!important;
}
</style>
<script>
export default {
    props: {
        question: Object,
    },
    data(){
        return{
        Video:this.question.video
        };
    },
    methods: {
        goToDetail(question) {
            this.$router.push(`/detail/${question._id}`);
        },
    },
};
</script>
