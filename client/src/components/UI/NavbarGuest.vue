<template>
    <v-app-bar flat dense app dark class="indigo" height="40">
        <v-toolbar-title class="">
            <v-btn plain :ripple="false" class="" to="/">
                <v-img src="@/assets/logo.png" class="mr-2"></v-img>
                Solve My Issue
            </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-toolbar-items>
            <v-btn plain class="" to="/login" exact> Login/Register </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>
