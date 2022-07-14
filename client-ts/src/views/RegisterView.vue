<template>
    <v-container grid-list-xs class="d-flex justify-center">
        <register-component></register-component>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegisterComponent from "@/components/User/RegisterComp.vue";

@Component({
    name: "LoginView",
    components: {
        RegisterComponent,
    },
})
export default class RegisterView extends Vue {}
</script>
