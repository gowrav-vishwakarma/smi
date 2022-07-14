<template>
    <div class="d-flex flex-column justify-start">
      <div class="d-flex flex-row justify-space-between pl-2 pr-2">
        <h4>Badges won</h4>
        <small>View all badges</small>
      </div>
        <div class="d-flex flex-row justify-space-between pl-2 pr-2 mb-3 mt-4">
      <div v-for="(badge,key) in badges" :key="key" class="badge d-flex flex-column">
          <h2 class="text-dark mb-3 mt-3"><v-icon class="mr-4" v-bind:style="{ 'color': badge.color,'border': `1px solid ${badge.color}`,'border-radius': '12px','padding':'4px' }" large>mdi-trophy-award</v-icon> {{badge.num}}</h2>
           <h3>{{badge.name}} Badge</h3>
           <h6>{{badge.content}}</h6>
      </div>
      </div>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css? family=Comfortaa&display=swap');
h4{
font-family: 'Inter';
font-weight: 400;
font-size: 17.67px;
line-height: 21.39px;
color: #000000;
}

h6{
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 3px;
line-height: 8px;
color: #000000;
overflow-x: scroll;
}

h3{
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 29px;
color: #000000;
}
.badge{
box-sizing: border-box;
width: 203px;
height: 148px;
background: #FBFBFB;
border: 1px solid #EEEEEE;
box-shadow: 0px 2px 4px rgba(157, 155, 155, 0.06);
border-radius: 12px;
}

</style>

<script>
export default{
    data(){
        return{
             badges:[
                {
                    name:'Gold',
                    num:1,
                    color:'#FFD700',
                    content:'Received after solving 3 questions in a row'
                },
                {
                    name:'Silver',
                    num:0,
                    color:'#C0C0C0',
                    content:'Get now'
                },
                {
                    name:'Bronze',
                    num:3,
                    color:'#CD7F32',
                    content:'Received after solving 5 questions in a row'
                }
             ]
        };
    },
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