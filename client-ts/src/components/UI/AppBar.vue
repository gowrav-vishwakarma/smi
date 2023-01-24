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
        to="/"
      />

      <h3 alt="SMI Name" class="shrink mt-1 hidden-sm-and-down" contain>
        <v-btn text :ripple="false" to="/" plain>Solve My Issue</v-btn>
      </h3>
    </div>
    <v-spacer></v-spacer>
    <v-layout :column="true">
      <v-text-field
        class="mt-1 white--text lighten-4"
        prepend-inner-icon="mdi-magnify"
        append-outer-icon="mdi-filter-multiple"
        hide-details="true"
      >
      </v-text-field>
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
