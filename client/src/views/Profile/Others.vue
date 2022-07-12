<template>

<div v-if="!error" class="d-flex justify-space-around">
        <div class="mt-2">
            <Docker/>
        </div>
        <div class="mt-2 ml-3 d-flex flex-column">
            <div class="mb-3">
                <UserView v-if="userInfo._id" :currentUser="userInfo"/>
            </div>
        </div>
        <div class="mt-2">
             <StatusReview v-if="userInfo._id" :currentUser="userInfo"/>
        </div>
</div>
    <v-container v-else>
        <Error/>
    </v-container>
</template>

<script>
import UserView from "@/components/Profile/Profile.vue"
import DataService from "@/services/DataService";
import Error from "@/components/Errors/500.vue"
import StatusReview from '@/components/Profile/Status-review.vue'
import Docker from "@/components/UI/Docker.vue";

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
        Error,
        Docker,
        StatusReview
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
                    // this.$router.push(`/error`)
                });
        },
    }
};
</script>
