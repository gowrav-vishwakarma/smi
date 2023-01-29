<template lang="pug">
        v-list(shaped)
            //- v-subheader Topics 
            v-list-item-group(v-model="selectedItem" color="primary")
                v-list-item(v-for="(item, i) in items" :key="i")
                    v-list-item-icon
                        v-icon(v-text="item.icon")
                    v-list-item-content
                        v-list-item-title(v-text="item.text")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "TopicList",
  components: {},
})
export default class TopicList extends Vue {
  selectedItem = 1;
  items = [
    { text: "Home", icon: "mdi-home" },
    { text: "Notification", icon: "mdi-bell" },
    { text: "Profile", icon: "mdi-account" },
    { text: "Saved Question", icon: "mdi-bookmark" },
    { text: "Follow Topics", icon: "mdi-pound" },
    { text: "Real-Time", icon: "mdi-clock" },
    { text: "Audience", icon: "mdi-account" },
    { text: "Conversions", icon: "mdi-flag" },
  ];
}
</script>
