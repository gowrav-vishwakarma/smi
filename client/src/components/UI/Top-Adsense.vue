<template>
    <v-container class="d-flex flex-column adsense mr-0">
        <div class="text-center d-flex flex-column">

    

            <h3 class="mb-3">Top Running Solvers</h3>
            <div
                v-for="(user, key) in users"
                :key="key"
                class="d-flex flex-row justify-space-between top ml-1 mr-1 mb-2"
            >
                <div class="d-flex flex-row">
                    <v-icon class="mr-1">mdi-trophy</v-icon>
                    <UserAvatar class="ma-2" :user="user" />
                    <div class="d-flex mt-3 ml-2 text-left flex-column">
                        <small>{{ user.name }}</small>
                        <small>{{ user.type }}</small>
                    </div>
                </div>
                <div class="d-flex mt-3 flex-row">
                    <small class="mt-3"
                        ><v-icon small>mdi-star</v-icon
                        >{{ user.totalRatingPoints }}</small
                    >
                    <v-icon>mdi-dots-vertical</v-icon>
                </div>
            </div>
            <v-divider class="mt-3"></v-divider>
            <h4>google adsense</h4>
            <div class="google mt-3">
                <v-img
                    lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOMOxj9bP0koCwfh2x7znjIEoJKLq6Ofz-cw&usqp=CAU"
                    height="600"
                    width="400"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOMOxj9bP0koCwfh2x7znjIEoJKLq6Ofz-cw&usqp=CAU"
                ></v-img>
            </div>
        </div>
    </v-container>
</template>

<style>
.adsense {
    width: 80%!important;
    border-left: 1px solid lightgray;
}
.status{
    border: .7px solid grey;
    border-radius: 15px;
    padding: 5px;
}
.top {
    border-bottom: 1px solid grey;
}
</style>

<script>
import DataService from "@/services/DataService";

import UserAvatar from "@/components/User/Avatar.vue";
export default {
    data() {
        return {
            users: {},
        };
    },
    components: {
        UserAvatar,
    },
    mounted() {
        this.getTopUser();
    },
    methods: {
        getTopUser() {
            DataService.getTopRatingUser()
                .then((response) => {
                    this.users = response.data;
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>
