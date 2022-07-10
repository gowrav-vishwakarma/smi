<template>
    <div>
        <guest-top-menu></guest-top-menu>
        <logged-in-top-menu></logged-in-top-menu>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GuestTopMenu from "@/components/User/TopMenu/GuestUser.vue";
import LoggedInTopMenu from "@/components/User/TopMenu/LoggedInUser.vue";

@Component({
    name: "TopMenu",
    components: {
        GuestTopMenu,
        LoggedInTopMenu,
    },
})
export default class App extends Vue {}
</script>
