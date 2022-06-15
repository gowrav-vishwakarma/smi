<template>
    <v-container>
    <v-row>
        <v-col cols="1">
            <v-img
            max-height="150"
            max-width="250"
            src="./Profile.svg"
            ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="8">
           <h2>{{welcomeName}}</h2>
           <p>
               {{ topics.join(", ") }}
           </p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
            <v-card class="pa-2" outlined tile>
                Current Badge
            </v-card>
        </v-col>
    </v-row>

    <v-row>
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
</v-container>
</template>

<script>
import DataService from '@/services/DataService';
export default{
    data(){
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
           save:"Save"
       };
    },
    props:{
        currentUser:Object
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