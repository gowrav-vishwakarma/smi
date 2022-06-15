<template>
    <v-container> 
        <v-row>
            <v-col cols="9">
               <UserView :currentUser="this.$store.getters.currentUser"/>
            </v-col>
            <v-col cols="3">

            </v-col>
        </v-row>
    </v-container>
   
</template>

<script>
import UserView from '@/components/User/Profile.vue'
export default {
    name: "ProfilePage",
    components: {
       UserView
    },
};
</script>
