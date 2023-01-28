<template lang="pug">
  v-app
    ui-app-bar
    v-main(class="grey lighten-3")
      router-view
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
