<template>
    <v-flex class="mx-2 py-4 px-2 card" xs12 md6 sm-6>
        <div class="d-flex flex-column justify-center align-center">
            <div class="py-5 d-flex flex-row jusity-center">
                    <h2 class="head">Login to your Account</h2>
                </div>
       <div class="mt-3 d-flex">         
              <v-form ref="form" v-model="valid" lazy-validation>
                

                <v-text-field
                    v-model="logForm.emailL"
                    :rules="emailRules"
                    placeholder="Enter your email id"
                    outlined
                    dense
                    required
                    class="field"
                ></v-text-field>
               
               <v-text-field
                    v-model="logForm.passwordL"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    placeholder="Password"
                    outlined
                    dense
                    class="field mt-2"
                    @click:append="show1 = !show1"
                ></v-text-field>
              <div class="field mt-2 d-flex align-start justify-space-between">
                  <span>
                  <input type="checkbox" class="mr-1 ml-1" v-model="remember">
                  <label>Remember me</label>
                  </span>
                  <small>
                      Forgot password?
                  </small>
              </div>
              
            </v-form>
            </div>
             <v-btn class="lgnbtn" @click="login"> Login </v-btn>
             <p>Not having an account ? <router-link class="text-decoration-none" to="/register">Sign Up</router-link> </p>
            </div>
    </v-flex>
</template>

<style>
@import url('https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css? family=Comfortaa&display=swap');

.head{
font-family: 'Inter', sans-serif;
font-weight: 400;
font-size: 24px;
line-height: 29.05px;
color: #000000;
}
.field{
    width: 596px;
    height: 58px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 24.2px;
    color: #777777;
}
.lgnbtn{
    width: 388px;
    height: 52px;
    border-radius: 12px;
    background-color: #69AEFE!important;
    margin-bottom: 1rem;
}

</style>

<script>

import DataService from "@/services/DataService";

export default {
    data() {
        return {
            logForm: {
                emailL: "",
                passwordL: "",
            },
            show1:false,
            remember:false,
            valid: false,
            submitted: false,
            user: {},
            emailRules: [
                (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid",
            ],
        };
    },
    methods: {
        login() {
            var data = {
                email: this.logForm.emailL,
                password: this.logForm.passwordL,
            };
            DataService.Login(data)
                .then((response) => {
                    console.log(response.data);
                    this.user = response.data.user;
                    this.user.token = response.data.token;
                    this.$store.commit("setCurrentUser", this.user);
                    let filter = {
                        topics: this.user.topic,
                        tags: [],
                        languages: this.user.languagesSpeaks,
                        isPaid: undefined,
                        sortBy: "newest",
                    };
                    this.$store.commit("updateFilters", filter);
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                    this.$vToastify.error(
                        "Could not login, Is your username or password correct?"
                    );
                });
        },
    },
};
</script>
