<template>
  <div class="d-flex align-center justify-center">
    <v-flex class="mx-2 py-4 px-2 card mt-10" xs12 md6 sm-6>
        <div class="d-flex flex-column justify-center align-center">
            <div class="py-5 d-flex flex-row jusity-center">
                    <h2 class="head">Reset Password</h2>
                </div>
       <div class="mt-3 d-flex">         
              <v-form ref="form" v-model="valid" lazy-validation>
                

                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    placeholder="Password"
                    outlined
                    dense
                    class="field mt-2"
                    @click:append="show1 = !show1"
                ></v-text-field>
               
               
              
            </v-form>
            </div>
             <v-btn class="lgnbtn" @click="Update"> Update Password </v-btn>
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
             show1:false,
             password:'',
             token:this.$route.params.token,
        };
    },
    methods:{
        Update(){
            DataService.updatePass(this.token,this.password)
            .then(res=>{
                console.log(res);
                 this.$vToastify.success(
                        res.data.message
                    );
            })
            .catch(err=>{
                console.log(err);
                 this.$vToastify.error(
                        err.response.data.error
                    );
            })
        }
    }
};
</script>
