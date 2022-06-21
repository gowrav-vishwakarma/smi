<template>
    <v-container class="d-flex flex-column review mr-0">
        <div class="text-center d-flex flex-column">
            
           <div class="status mb-2">
               <v-icon
                                small
                                v-if="this.currentUser.onlineStatus == 'Online' "
                                color="green"
                                class="mr-2"
                            >
                                mdi-checkbox-blank-circle
                            </v-icon>
                            <v-icon small v-else color="red" class="mr-2">
                                mdi-checkbox-blank-circle
                            </v-icon>
                            {{this.currentUser.onlineStatus}}
                           
           </div>
           <div class="d-flex flex-row mb-2">
              <v-icon small class="text-warning mr-2">mdi-star-circle</v-icon> Rated {{this.currentUser.solvedQuestionsCount}} as Question Solver
           </div>

          <div class="d-flex flex-row">
           <v-icon small class="text-warning mr-2">mdi-star-circle</v-icon> Rated {{this.currentUser.totalQuestionerRatingCount}} as Questioner
          </div>

            <v-divider class="mt-3"></v-divider>
            <h5>Your Reviews</h5>
            <div class="google mt-3">
                <v-img
                    lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOMOxj9bP0koCwfh2x7znjIEoJKLq6Ofz-cw&usqp=CAU"
                    height="600"
                    width="400"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOMOxj9bP0koCwfh2x7znjIEoJKLq6Ofz-cw&usqp=CAU"
                ></v-img>
            </div>
        </div>
    </v-container>
</template>

<style>
.review{
    width: 80%!important;
    border-left: 1px solid lightgray;
}
.status{
    border: 1px solid grey;
    border-radius: 15px;
    padding: 5px;
}
</style>

<script>
export default {
    mounted() {
        this.getReviews();
    },
    methods: {
        getReviews() {
           console.log("Fetch reviews")
        },
    },
    props:{
        currentUser:Object
    }
};
</script>
