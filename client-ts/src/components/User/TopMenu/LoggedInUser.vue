<template>
  <div class="d-flex">
    <ws-manager></ws-manager>
    <!-- <v-btn text plain to="/ask-question">
      <v-icon>mdi-plus</v-icon>
      Ask Question
    </v-btn> -->
    <v-btn text plain to="/my-profile">
      {{ $store.getters.loggedInUser.name }}
    </v-btn>
    <v-btn text plain @click="logout" v-if="$store.getters.isAuthenticated">
      <v-icon> mdi-logout</v-icon>
      logout
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WsManager from "@/components/User/TopMenu/WSManager.vue";
import { AuthStoreModule } from "@/store";

@Component({
  name: "LoggedInUserTopMenu",
  components: {
    WsManager,
  },

  methods: {
    async logout() {
      console.log("hello");
      await AuthStoreModule.resetCurrentUserAction();
    },
  },
})
export default class LoggedInUserTopMenu extends Vue {}
</script>
