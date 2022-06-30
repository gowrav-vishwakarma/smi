<template>
  <div class="d-flex align-center justify-center">
    <v-flex class="mx-2 py-4 px-2 card mt-10" xs12 md6 sm-6>
        <div class="d-flex flex-column justify-center align-center">
            <div class="py-5 d-flex flex-row jusity-center">
                    <h2 class="head">Forgot Password</h2>
                </div>
       <div class="mt-3 d-flex">         
              <v-form ref="form" v-model="valid" lazy-validation>
                

                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    placeholder="Enter your email id"
                    outlined
                    dense
                    required
                    class="field"
                ></v-text-field>
               
               
              
            </v-form>
            </div>
             <v-btn class="lgnbtn" @click="Reset"> Reset Password </v-btn>
             <p>Back to <router-link class="text-decoration-none" to="/login">Login</router-link> </p>
            </div>
    </v-flex>
    </div>
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
import DataService from '@/services/DataService';


export default {
    data(){
        return{
             email:'',
             emailRules: [
                (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid",
            ],
        };
    },
    methods:{
        Reset(){
            DataService.forgetPass(this.email)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
};
</script>
