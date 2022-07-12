<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="SMI Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="40"
      />

      <h3 alt="SMI Name" class="shrink mt-1 hidden-sm-and-down" contain>
        Frendy 4.0
      </h3>
    </div>

    <v-spacer></v-spacer>
    <top-menu></top-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopMenu from "@/components/User/TopMenu/index.vue";

@Component({
  name: "AppBar",
  components: {
    TopMenu,
  },
})
export default class App extends Vue {}
</script>
