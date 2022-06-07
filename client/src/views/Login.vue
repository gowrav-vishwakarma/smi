<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" grid-list-md text-xs-center>
                <v-layout row wrap>
                    <LoginView />
                    <RegisterView />
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import LoginView from "@/components/User/Login";
import RegisterView from "@/components/User/Register";

export default {
    components: {
        LoginView,
        RegisterView,
    },
};
</script>
