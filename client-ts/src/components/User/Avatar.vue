<template>
  <div>
    <!-- show img if user.img is available or show vue-garvatar with users email as prrop-->
    <img
      v-if="user.avatar"
      :src="user.avatar"
      alt="avatar"
      class="avatar"
      max-height="30"
      max-width="30"
    />
    <gravatar
      v-else
      :email="user.email"
      :size="SIZE"
      :default="'identicon'"
    ></gravatar>
  </div>
</template>

<script>
import Gravatar from "vue-gravatar";

export default {
  name: "UserAvatar",
  props: {
    user: {
      type: Object,
      required: true,
    },
    SIZE: {
      type: Number,
      default: 45,
    },
  },
  components: {
    Gravatar,
  },
};
</script>
