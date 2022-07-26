<template lang="pug">
    .caption My Comments
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import userApi from "@/services/user.api";

@Component({
  name: "UserComments",
})
export default class UserCommentsComponent extends Vue {
    comments: any[] = [];

  async mounted() {
    this.comments = await userApi.getMyComments();
    console.log(this.comments);
  }
}
</script>
