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
                  <h4 class="mb-2">Title of question here</h4>
                  <h6>Name of questioner | <v-icon v-for="s in 3" class="mr-2" :key="s" small>mdi-camera</v-icon></h6>
                </div>
            </v-col>

            <v-col class="d-flex flex-column justify-start" cols="3">
                <small class="d-flex justify-end"><v-icon small>mdi-eye</v-icon> 16 Views</small>
                <div class="d-flex justify-space-around">
                    <div class="d-flex flex-column rate mb-0 mt-0">
                        <small>Rated 4.7</small>
                        <small>by 546 people</small>
                    </div>
                    <v-icon>mdi-share</v-icon>
                    <v-icon>mdi-star</v-icon>
                    <v-icon>mdi-star</v-icon>
                </div>
            </v-col>
       </v-row>
       <v-row class="d-flex justify-space-between mb-2">
           <v-col cols="11">
               <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo sunt ratione animi nesciunt sit qui quis veritatis ut itaque? Repellendus, ali</p>
           </v-col>
           <v-col>
               <v-icon large>mdi-youtube</v-icon>
           </v-col>
       </v-row>
            
        <v-divider></v-divider>
        <v-row class="d-flex justify-space-between pl-3 pr-3 mb-2">
            <v-col class="d-flex flex-column align-start" cols="4">
                  <small>Tag used</small>
                  <div class="mt-3">
                 <v-btn class="tag" v-for="b in 5" :key="b">Text</v-btn>
                 </div>
            </v-col>
            <v-col class="d-flex flex-row justify-space-around mt-6" cols="4">
                   <v-btn class="tag2"><v-icon>mdi-star</v-icon>Appreciate</v-btn>
                   <v-btn class="tag2">2 people answered</v-btn>
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
.rate
small{
    font-size: .5rem;
    margin: -2;
}
.tag {
    border-radius: 15px;
    width: auto !important;
    max-height: 1rem !important;
    background-color: #EDEDED !important;
    margin: 0rem 0.3rem;
    padding: 0rem !important;
    font-size: 0.6rem !important;
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
