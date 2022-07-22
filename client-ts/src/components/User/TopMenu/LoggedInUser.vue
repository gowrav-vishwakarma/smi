<template>
  <div class="d-flex">
    <ws-manager></ws-manager>
    <v-btn text plain to="/ask-question">
      <v-icon>mdi-plus</v-icon>
      Ask Question
    </v-btn>
    <v-btn text plain to="/my-profile">
      {{ $store.getters.loggedInUser.name }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WsManager from "@/components/User/TopMenu/WSManager.vue";

@Component({
  name: "LoggedInUserTopMenu",
  components: {
    WsManager,
  },
})
export default class LoggedInUserTopMenu extends Vue {}
</script>
