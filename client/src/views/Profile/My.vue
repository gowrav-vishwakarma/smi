<template>
<div class="d-flex justify-space-around mt-8">
        <!-- <div class="mt-2">
            <Docker/>
        </div> -->
        <div class="mt-2 ml-3 d-flex flex-column justify-start">
            <div class="mb-3">
                 <UserView :currentUser="this.$store.getters.currentUser"/>
            </div>
        </div>
    </div>
</template>

<script>
import UserView from '@/components/Profile/Profile.vue'
// import Docker from '@/components/UI/Docker.vue'
export default {
    name: "ProfilePage",
    components: {
    UserView,
    // Docker
},
};
</script>
