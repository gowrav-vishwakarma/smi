<template>
    <div class="d-flex flex-column justify-start">
     <h3 class="mt-4 ml-4">Ratings and Reviews</h3>
     <div class="revBox mt-3 mb-7">
        <div class="d-flex flex-row text-center justify-space-around mt-2">
             <span><v-icon small class="text-warning mr-2">mdi-star-circle</v-icon> Rated {{this.currentUser.solvedQuestionsCount}} as Question Solver</span>
          
           <span><v-icon small class="text-warning mr-2">mdi-star-circle</v-icon> Rated {{this.currentUser.totalQuestionerRatingCount}} as Questioner</span>
          </div>
          <v-divider></v-divider>
         <div class="d-flex flex-row align-items-center">
            <v-btn class="head ml-3">Top Reviews</v-btn>
            <v-btn class="head ml-3">Newest Reviews</v-btn>
         </div> 
     </div>

</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css? family=Comfortaa&display=swap');

h3{
font-family: 'Inter';
font-weight: 400;
font-size: 17.67px;
line-height: 21.39px;
color: #000000;
}
.revBox{
box-sizing: border-box;
width: 730px;
height: 449px;
background: #FBFBFB;
border: 1px solid #EEEEEE;
box-shadow: 0px 2px 4px rgba(157, 155, 155, 0.06);
border-radius: 12px;
}
.head{
background: #EEEEEE;
border: 1px solid #EEEEEE;
box-shadow: 0px 2px 4px rgba(157, 155, 155, 0.06);
border-radius: 12px;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
}

</style>

<script>
export default{
    props:{
        currentUser:Object
    },
    mounted(){
      console.log(this.currentUser)
    },
    methods:{
        notSameUser(){
            return this.$store.getters.currentUser._id == this.currentUser._id 
        },
       
    }
}
</script>