<template>
     <v-container> 
        <v-row>
            <v-col cols="9">
               <UserView v-if="userInfo._id" :currentUser="userInfo"/>
            </v-col>
            <v-col cols="3">

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UserView from "@/components/User/Profile.vue"
import DataService from "@/services/DataService";
export default {
    name: "ProfilePage",
    data(){
        return{
             userInfo:{}
        };
    },
    components: {
        UserView
    },
    mounted(){
        this.fetchUser(this.$route.params.id);
    },
    methods:{
        fetchUser(id) {
            DataService.getUserbyId(id)
                .then((response) => {
                    console.log(response.data)
                    this.userInfo = response.data[0];
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    }
};
</script>
