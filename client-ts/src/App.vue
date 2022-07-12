<template>
  <v-app>
    <ui-app-bar></ui-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UiAppBar from "@/components/UI/AppBar.vue";

@Component({
  components: {
    UiAppBar,
  },
})
export default class App extends Vue {
  created() {
    console.log("App created");
  }
}
</script>
