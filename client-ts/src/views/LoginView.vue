<template>
  <v-container class="text-center mt-4" style="max-width: 500px">
    <v-card elevation="2" class="pa-4">
      <login-component></login-component>
    </v-card>
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
