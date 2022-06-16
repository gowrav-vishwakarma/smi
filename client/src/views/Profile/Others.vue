<template>
     <v-container v-if="!error"> 
        <v-row>
            <v-col cols="9">
               <UserView v-if="userInfo._id" :currentUser="userInfo"/>
            </v-col>
            <v-col cols="3">

            </v-col>
        </v-row>
    </v-container>
    <v-container v-else>
        <Error/>
    </v-container>
</template>

<script>
import UserView from "@/components/User/Profile.vue"
import DataService from "@/services/DataService";
import Error from "@/components/Errors/500.vue"

export default {
    name: "ProfilePage",
    data(){
        return{
             userInfo:{},
             error: false
        };
    },
    components: {
        UserView,
        Error
    },
    mounted(){
        this.fetchUser(this.$route.params.id);
    },
    methods:{
        fetchUser(id) {
            DataService.getUserbyId(id)
                .then((response) => {
                    this.userInfo = response.data[0];
                })
                .catch((e) => {
                    this.$store.commit("setCurrentError", e.response.data);
                     this.$router.push(`/error`)
                });
        },
    }
};
</script>
