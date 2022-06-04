<template>
    <v-app>
        <!-- Start of Navigation -->
        <nav class="mb-2 px-0">
            <!-- Start of app toolbar -->
            <v-app-bar app class="py-auto">
                <v-toolbar-title class="headlines"
                    ><router-link class="no-dec" to="/"
                        >Solve My Issue</router-link
                    ></v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn class="no-dec" to="/login" exact
                        >Login/Register</v-btn
                    >
                </v-toolbar-items>
            </v-app-bar>
            <!-- End of app toolbar -->
        </nav>
        <!-- End of Navigation -->

        <v-main>
            <!-- Display view pages here based on route -->
            <router-view></router-view>
        </v-main>
        <v-bottom-navigation
            v-model="value"
            class="justify-space-between hidden-md-and-up px-2"
        >
            <v-btn to="/" value="recent">
                <span>Home</span>

                <v-icon>mdi-home</v-icon>
            </v-btn>

            <v-btn to="/login" value="nearby">
                <span>Login</span>

                <v-icon>mdi-login</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script>
export default {
    name: "App",
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
