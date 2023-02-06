<template lang="pug">
        v-list(shaped)
            //- v-subheader Topics 
            v-list-item-group(v-model="selectedItem" color="primary")
                v-list-item(v-for="(item, i) in items" :key="i")
                    v-list-item-icon
                        v-icon(v-text="item.icon")
                    v-list-item-content
                        v-list-item-title(v-text="item.name")
</template>

<script lang="ts">
interface TopicInterface {
  id: string;
  name: string;
  icon: string;
  description: string;
}
import { Component, Prop, Vue } from "vue-property-decorator";
import TopicApiService from "@/services/topics.api";

@Component({
  name: "TopicList",
  components: {},
})
export default class TopicList extends Vue {
  selectedItem = 1;
  items: TopicInterface[] = [];

  @Prop({ default: false }) getTopicList: any;

  sideMenuList(): TopicInterface[] {
    return [
      { id: "sidemenu1", name: "Home", icon: "mdi-home", description: "" },
      {
        id: "sidemenu2",
        name: "Notification",
        icon: "mdi-bell",
        description: "",
      },
      {
        id: "sidemenu3",
        name: "Profile",
        icon: "mdi-account",
        description: "",
      },
      {
        id: "sidemenu4",
        name: "Saved Question",
        icon: "mdi-bookmark",
        description: "",
      },
      {
        id: "sidemenu5",
        name: "Follow Topics",
        icon: "mdi-pound",
        description: "",
      },
      {
        id: "sidemenu6",
        name: "Real-Time",
        icon: "mdi-clock",
        description: "",
      },
      {
        id: "sidemenu7",
        name: "Audience",
        icon: "mdi-account",
        description: "",
      },
      {
        id: "sidemenu8",
        name: "Conversions",
        icon: "mdi-flag",
        description: "",
      },
    ];
  }

  async mounted() {
    if (this.getTopicList) {
      this.items = await TopicApiService.getTopics();
    } else {
      this.items = this.sideMenuList();
    }
  }
}
</script>
