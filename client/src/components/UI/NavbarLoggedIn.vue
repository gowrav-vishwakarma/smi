<template>
    <nav class="mb-2 px-0">
        <v-app-bar flat dense app dark>
            <v-toolbar-title class="">
                <v-btn plain :ripple="false" class="text-h6" to="/">
                    <v-img src="@/assets/logo.png" class="mr-2"></v-img>
                    Solve My Issue
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- <v-divider vertical></v-divider> -->
            <v-btn plain small class="red--text">
                <v-icon>mdi-heart</v-icon>
                Q Rating
            </v-btn>
            <v-btn plain small class="yellow--text" hover>
                <v-icon>mdi-star</v-icon>
                S Rating
            </v-btn>
            <v-toolbar-items>
                <v-btn plain class="" to="/ask-question"> Ask Question </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn plain class="" to="/profile"> Profile </v-btn>
            </v-toolbar-items>
            <!-- <v-toolbar-items>
                <v-btn plain class="" @click="logout"> Logout </v-btn>
            </v-toolbar-items> -->
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
