<template>
  <v-container grid-list-xs class="d-flex justify-center">
    <login-component></login-component>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginComponent from "@/components/User/LoginComp.vue";

@Component({
  name: "LoginView",
  components: {
    LoginComponent,
  },
})
export default class LoginView extends Vue {}
</script>
