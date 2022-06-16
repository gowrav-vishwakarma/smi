<template>
   <v-card
      class="d-flex justify-center mb-2"
      flat
      tile
    >
     <v-card
  elevation="11"
  class="Qcard"
  loading
  outlined
  shaped
  tile
>
   <v-container>
       <v-row class="d-flex justify-space-between">
            <v-col class="d-flex justify-start mb-3" cols="auto">
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="70"
                    max-width="54"
                    class="mr-4"
                    src="https://picsum.photos/id/11/500/300"
                    ></v-img>
                <div class="d-flex flex-column justify-space-around">
                  <h4 class="mb-2" @click="goToDetail(question)">{{question.title}}</h4>
                  <h6>{{question.by.name}} | 
                   <v-icon class="icon mr-2" small color="green"
                            >mdi-chat</v-icon
                        >
                        <v-icon
                            small
                            v-if="question.canShareScreen"
                            color="green"
                            class="mr-2"
                        >
                            mdi-monitor
                        </v-icon>
                        <v-icon small v-else color="red"
                            class="mr-2">
                            mdi-monitor-off
                        </v-icon>
                        <v-icon
                            small
                            color="green"
                            class="mr-2"
                            v-if="question.canDoVideoCall"
                        >
                            mdi-video
                        </v-icon>
                        <v-icon small color="red"
                            class="mr-2" v-else>
                            mdi-video-off
                        </v-icon>
                  </h6>
                </div>
            </v-col>

            <v-col class="d-flex flex-column justify-start" cols="3">
                <small class="d-flex justify-end"><v-icon small>mdi-eye</v-icon>{{question.status}}</small>
                <div class="d-flex justify-space-around">
                    <div class="d-flex flex-column rate mb-0 mt-0">
                        <h5>{{ humanized_time_span(question.createdAt) }}</h5>
                    </div>
                    <v-icon>mdi-star</v-icon>
                    <v-icon>mdi-share</v-icon>
                    <v-icon class="mt-1">mdi-download</v-icon>
                </div>
            </v-col>
       </v-row>
       <v-row class="d-flex justify-space-between mb-2">
           <v-col cols="10">
               <p @click="goToDetail(question)">{{shortdetail}}</p>
           </v-col>
           <v-col>
               <v-dialog
                v-model="dialog"
                width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          v-bind="attrs"
          v-on="on"
        >
           <v-icon large>mdi-youtube</v-icon>
        </v-btn>
      </template>

      <v-card>

        <v-card-text>
          <video width="100%" controls v-if="Video" :src="Video"></video>
        </v-card-text>

      </v-card>
    </v-dialog>
           </v-col>

       </v-row>
            
        <v-divider></v-divider>
        <v-row class="d-flex justify-space-between pl-3 pr-3 mb-2">
            <v-col class="d-flex flex-column align-start" cols="4">
                  <small>Tag used</small>
                  <div class="mt-3">
                 <v-chip
                            label
                            v-for="tag in question.tags"
                            :key="tag"
                             class="tag"
                        >
                            {{ tag }}
                        </v-chip>
                 </div>
            </v-col>
            <v-col class="d-flex flex-row justify-space-around mt-6" cols="4">
                   <v-btn class="tag2"><v-icon>mdi-plus</v-icon> Vote</v-btn>
                   <v-btn class="tag2">{{question.publicCommentsCount}} people answered</v-btn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
   </v-container>
</v-card>

    </v-card>

</template>

<style>
.Qcard{
    width: 70%!important;
}
h4,p{
  cursor: pointer;  
}
.rate
small{
    font-size: .5rem;
    margin: -2;
}
.tag {
    border-radius: 25px!important;
    width: auto !important;
    max-height: 1rem !important;
    background-color: #EDEDED !important;
    margin: 0rem 0.3rem;
    padding: .5rem !important;
    font-size: 0.7rem !important;
}
.tag2 {
    border-radius: 15px;
    width: auto !important;
    max-height: 1rem !important;
    background-color: #EDEDED !important;
    margin: 0rem 0.3rem;
    padding: 1rem !important;
    font-size: 0.6rem !important;
}
</style>

<script>
import S from "string";
export default {
    props: {
        question: Object,
    },
    data() {
        return {
            Video: this.question.video,
            dialog:false
        };
    },
    computed: {
        questionerRating() {
            return this.question.by.totalQuestionerRatingCount
                ? this.question.by.questionerRatingPoint /
                      this.question.by.totalQuestionerRatingCount
                : "(New)";
        },

        shortdetail() {
            return S(this.question.detail).stripTags().truncate(100).s;
        },
    },
    methods: {
        goToDetail(question) {
            this.$router.push(`/question/${question._id}`);
        },
    },
};
</script>
