<template>
    <v-app-bar flat dense app dark class="indigo" height="60">
        <v-toolbar-title>
            <v-btn plain :ripple="false" class="text-h7" to="/">
                <v-img src="@/assets/logo.png" class="mr-2"></v-img>
                Solve My Issue
            </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <v-divider vertical></v-divider> -->
        <v-btn
            plain
            small
            class="white--text router-link-active router-link-exact-active"
        >
            <v-icon>mdi-heart</v-icon>
            Q Rating
        </v-btn>
        <v-btn plain small class="white--text" hover>
            <v-icon>mdi-star</v-icon>
            S Rating
        </v-btn>
        <v-toolbar-items>
            <v-btn plain class="" to="/ask-question"> Ask Question </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
            <v-btn plain class="" to="/profile"> Profile </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
            <v-btn plain class="" @click="logout"> Logout </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
           
            <div class="d-flex flex-row justify-space-between dropd" v-if="this.$store.state.currentUser">
                <h5 class="mt-4">Hello, {{this.$store.state.currentUser.name.split(" ")[0]}}</h5>
                <v-icon class="indigo ml-2">mdi-chevron-down</v-icon>
            </div>

             <div class="dropdown-content">
                <v-btn plain class="" to="/profile"> Profile </v-btn>
                  <v-btn plain class="" @click="logout"> Logout </v-btn>
                </div>
       
        </v-toolbar-items>
    </v-app-bar>
    <!-- End of app toolbar -->
</template>

<style>
.dropdown-content {
  display: none;
  background-color: #3F50B5;
  position: fixed;
  top: 60px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content v-btn {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropd{
    cursor: pointer;
    margin-top: .1rem;
}

.dropd:hover .dropdown-content {
  display: block;
}
</style>

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

<style scoped></style>
