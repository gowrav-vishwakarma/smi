<template>
  <v-container class="text-center mt-4" style="max-width: 600px">
    <v-card elevation="2" class="pa-4">
      <register-component></register-component>
    </v-card>
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
