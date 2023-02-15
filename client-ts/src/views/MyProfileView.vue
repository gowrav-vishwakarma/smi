<template lang="pug">
v-container(grid-list-xs="")
  v-tabs(v-model="tab")
    v-tab(v-for="(lable, component) in availableTabs" :key="lable")
      | {{ lable }}
    v-tabs-items(v-model="tab")
      v-tab-item(v-for="(label, component) in availableTabs" :key="label")
        component(:is="`${component}Component`")
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
  availableTabs = {
    Profile: "Profile",
    Questions: "My Questions",
    Offers: "My Offers",
    Comments: " MyComments",
    Settings: "Settings",
  };
}
</script>
