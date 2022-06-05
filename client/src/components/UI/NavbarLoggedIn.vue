<template>
    <nav class="mb-2 px-0">
        <v-app-bar dense app class="">
            <v-toolbar-title class="">
                <v-btn plain :ripple="false" class="" to="/">
                    <v-img src="@/assets/logo.png" class="mr-2"></v-img>
                    Solve My Issue
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-toolbar-items>
                <v-btn plain class="" to="/ask-question"> Ask Question </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn plain class="" to="/profile"> Profile </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn plain class="" @click="logout"> Logout </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <!-- End of app toolbar -->
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        },
    },
};
</script>
