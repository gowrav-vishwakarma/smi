<template lang="pug">
  div
    logged-in-top-menu(v-if="$store.getters.isAuthenticated")
    guest-top-menu(v-else)
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GuestTopMenu from "@/components/User/TopMenu/GuestUser.vue";
import LoggedInTopMenu from "@/components/User/TopMenu/LoggedInUser.vue";

@Component({
  name: "TopMenu",
  components: {
    GuestTopMenu,
    LoggedInTopMenu,
  },
})
export default class App extends Vue {}
</script>
