<template>
    <div class="cont">
    <div class="d-flex flex-row justify-start">
        <div class="ml-4 mr-5">
            <UserAvatar v-if="currentUser._id" :user="currentUser" :SIZE="100" />
        </div>
        <div class="ml-3 mt-4 infocard">
           <h2>{{welcomeName}}</h2>
           <p>
               {{ topics.join(", ") }}
           </p>
        </div>
        <div class="status ml-2 mt-3">
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
    </div>
    <div class="d-flex flex-row justify-start ml-3 mt-3">
      <v-btn class="toggle ml-3" @click="toggle1">Profile</v-btn>
      <v-btn class="toggle ml-3" @click="toggle2">{{notSameUser()?'Settings':'User Info'}}</v-btn>
    </div>
 
   <Setting :currentUser="currentUser" v-if="isShow2"/>
   
    <div v-if="isShow1" class="d-flex flex-column mt-4 profile">
       <Badges :currentUser="currentUser"/>
       <Reviews :currentUser="currentUser"/>
     <QuestionTab :currentUser="currentUser"/>
     </div>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css? family=Comfortaa&display=swap');

.infocard
h2{
text-align: left;  
font-family: 'Inter', sans-serif;
font-weight: 500;
font-size: 24px;
line-height: 29.05px;
color: #000000;
}

.status{
    border: 1px solid grey;
    border-radius: 15px;
    padding-top: 3px;
}
.cont{
  min-width: 60rem;
}
.toggle{
background: rgba(255, 204, 109, 0.55);
border: 1px solid #FFB21E;
box-shadow: 0px 2px 4px rgba(157, 155, 155, 0.06);
border-radius: 12px;
}
</style>

<script>
import DataService from '@/services/DataService';
import UserAvatar from '@/components/User/Avatar.vue'
import QuestionTab from './QuestionTab.vue';
import Setting from './Setting.vue'
import Badges from './Badges.vue'
import Reviews from './Reviews.vue';
export default{data(){
       return{
           welcomeName:this.notSameUser()? "Hello, "+this.currentUser.name.split(" ")[0]+"!":this.currentUser.name.split(" ")[0],
           firstName:this.currentUser.name.split(" ")[0],
           lastName: this.currentUser.name.split(" ")[1] || "",
           email: this.currentUser.email,
            emailRules: [
                (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid",
            ],
           username: this.currentUser.username.split("@")[0],
           country: this.currentUser.country,
           topics: this.currentUser.topic,
           isDisabled:true,
           edit:"Edit",
           save:"Save",
           isShow1:true,
           isShow2:false,
       };
    },
    components:{
    UserAvatar,
    QuestionTab,
    Setting,
    Badges,
    Reviews
},
    props:{
        currentUser:Object
    },
    mounted(){
      console.log(this.currentUser)
    },
    methods:{
      toggle1(){
         this.isShow1=true;
         this.isShow2=false;
      },
      toggle2(){

         this.isShow1=false;
         this.isShow2=true;
      },
        notSameUser(){
            return this.$store.getters.currentUser._id == this.currentUser._id 
        },
        editUser(){
            let data={
                name : this.firstName+" "+this.lastName,
                email: this.email,
                username:this.username,
                country:this.country
            }
         this.save = "Saving.."
         DataService.editUserbyId(data,this.currentUser._id)
          .then((response) => {
                    this.$store.commit("setCurrentUser", response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
         this.edit = "Saved"
         setTimeout(() => this.isDisabled = true, 1000);

        }
    }
}
</script>