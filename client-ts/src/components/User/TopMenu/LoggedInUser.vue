<template>
  <div class="d-flex">
    <ws-manager></ws-manager>
    Hello User
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
