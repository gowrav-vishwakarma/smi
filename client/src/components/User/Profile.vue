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
           <h2> Hello, {{firstName}}!</h2>
           <p>
               <small v-for="topic in topics" :key="topic">
                 {{topic}} ,
               </small>
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
        <v-form>
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
      </v-row>
    </v-container>
  </v-form>
    </v-row>
</v-container>
</template>

<script>
export default{
    data(){
       return{
           firstName:this.currentUser.name.split(" ")[0],
           lastName: this.currentUser.name.split(" ")[1] || "",
           email: this.currentUser.email,
           username: this.currentUser.username.split("@")[0],
           country: this.currentUser.country,
           topics: this.currentUser.topic
       };
    },
    props:{
        currentUser:Object
    }
}
</script>