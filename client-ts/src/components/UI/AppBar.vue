<template>
  <v-app-bar app color="white" flat>
    <div class="d-flex align-center">
      <!-- <v-img
        alt="SMI Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="40"
        to="/"
        bgcolor="primary"
      /> -->
      <h3 alt="SMI Name" class="shrink mt-1 hidden-sm-and-down" contain>
        <v-avatar color="orange" size="46" dark><small>Q/A</small></v-avatar>
        <v-btn text :ripple="false" to="/" plain>Solve My Issue</v-btn>
      </h3>
    </div>
    <v-spacer></v-spacer>
    <v-layout>
      <filter-component></filter-component>
      <!-- <v-text-field
        class="mt-1 white--text lighten-4"
        prepend-inner-icon="mdi-magnify"
        append-icon="mdi-filter-multiple"
        hide-details="auto"
        clearable
        filled
        rounded
      >
      </v-text-field> -->
      <v-chip-group v-if="$store.getters.filters">
        <v-chip
          disabled
          x-small
          v-for="t in $store.getters.filters.topics"
          :key="t"
        >
          {{ t }}
        </v-chip>
        <v-chip
          disabled
          x-small
          v-for="l in $store.getters.filters.languages"
          :key="l"
        >
          {{ l }}
        </v-chip>
      </v-chip-group>
    </v-layout>
    <v-spacer></v-spacer>

    <v-btn
      rounded
      color="orange"
      v-if="!$store.getters.isAuthenticated"
      dark
      @click="askquestion"
    >
      <v-icon> mdi-plus </v-icon>
      Ask Question
    </v-btn>
    <v-btn rounded color="orange" v-else dark to="/ask-question">
      <v-icon> mdi-plus </v-icon>
      Ask Question
    </v-btn>

    <v-spacer></v-spacer>
    <top-menu></top-menu>
    <auth-dialog :showDialog.sync="AuthDialogState"></auth-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopMenu from "@/components/User/TopMenu/index.vue";
import AuthDialog from "@/components/User/AuthDialog.vue";
import FilterComponent from "@/components/Common/FilterComponent.vue";

@Component({
  name: "AppBar",
  components: {
    TopMenu,
    AuthDialog,
    FilterComponent,
  },
})
export default class App extends Vue {
  AuthDialogState = false;

  askquestion() {
    if (!this.$store.getters.isAuthenticated) {
      this.AuthDialogState = true;
      return;
    }
  }
}
</script>
