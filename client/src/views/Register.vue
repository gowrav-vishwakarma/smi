<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" grid-list-md text-xs-center>
                <v-layout row wrap>
                    <RegisterView />
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import RegisterView from "@/components/User/Register";

export default {
    components: {
        RegisterView,
    },
};
</script>
