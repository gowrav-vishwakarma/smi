<template>
    <v-app>
        <v-main>
            <NavBarLoggedIn
                class="hidden-sm-and-down"
                v-if="$store.getters.isLoggedIn"
            />
            <NavBarGuest class="hidden-sm-and-down" v-else />
            <router-view></router-view>
            <BottomNavigation class="hidden-md-and-up" />
            <WSConnection />
        </v-main>
    </v-app>
</template>

<script>
import NavBarGuest from "@/components/UI/NavbarGuest";
import NavBarLoggedIn from "@/components/UI/NavbarLoggedIn";
import BottomNavigation from "@/components/UI/BottomNavigation";
import WSConnection from "@/components/UI/WSConnection";

export default {
    name: "App",
    components: {
        NavBarGuest,
        NavBarLoggedIn,
        BottomNavigation,
        WSConnection,
    },
    data() {
        return {
            drawer: false,
            value: "recent", // Hide mobile side menu by default
        };
    },
};
</script>

<style>
.no-dec {
    text-decoration: none;
    border-radius: 6px !important;
    background-color: #ffffff !important;
}
.no-dec:active,
.no-dec:hover {
    background-color: white;
}
</style>

<!-- 
npm run build && npx http-server dist    -->
