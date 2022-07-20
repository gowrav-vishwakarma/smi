<template lang="pug">
v-container(grid-list-xs="")
  v-tabs(v-model="tab")
    v-tab(v-for="tab in availableTabs" :key="tab")
      | {{ tab }}
    v-tabs-items(v-model="tab")
      v-tab-item
        profile-component
      v-tab-item
        questions-component
      v-tab-item
        offers-component
      v-tab-item
        comments-component
      v-tab-item
        settings-component
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ProfileComponent from "@/components/User/Profile.vue";
import QuestionsComponent from "@/components/User/Questions.vue";
import OffersComponent from "@/components/User/Offers.vue";
import CommentsComponent from "@/components/User/Comments.vue";
import SettingsComponent from "@/components/User/Settings.vue";

@Component({
  components: {
    ProfileComponent,
    QuestionsComponent,
    OffersComponent,
    CommentsComponent,
    SettingsComponent,
  },
})
export default class MyProfileView extends Vue {
  tab = 0;
  availableTabs = [
    "Profile",
    "MyQuestions",
    "MyOffers",
    "MyComments",
    "Settings",
  ];

  getTabComponent() {
    return this.availableTabs[this.tab];
  }
}
</script>
