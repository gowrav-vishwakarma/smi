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
      <v-btn @click="isShow = !isShow">{{!isShow?'Profile':'Settings'}}</v-btn>
    </div>
 

    <v-row v-show="!isShow">
        <v-form :disabled="isDisabled">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="firstName"
            label="First Name"
            filled
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="lastName"
            label="Last Name"
            filled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
             <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    filled
                ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="country"
            label="Country"
            filled
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="username"
            label="Username"
            filled
          ></v-text-field>
        </v-col>
        <v-col v-if="notSameUser()" cols="auto">
            <v-btn v-if="isDisabled" @click="()=>isDisabled=false">{{edit}}</v-btn>
            <v-btn v-if="!isDisabled" @click="editUser()">{{save}}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
    </v-row>
    <div v-if="isShow" class="d-flex flex-column mt-4 profile">
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
    height: 2.2rem;
    padding: 10px;
}
.cont{
  min-width: 50rem;
}
</style>

<script>
import DataService from '@/services/DataService';
import UserAvatar from '@/components/User/Avatar.vue'
import QuestionTab from './QuestionTab.vue';
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
           isShow:true,
       };
    },
    components:{
      UserAvatar,
      QuestionTab
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