<template>
    <div>
        <!-- show img if user.img is available or show vue-garvatar with users email as prrop-->
        <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="avatar"
            class="avatar"
            max-height="70"
            max-width="54"
        />
        <gravatar
            v-else
            :email="user.email"
            :size="50"
            :default="'identicon'"
        ></gravatar>
    </div>
</template>

<script>
import Gravatar from "vue-gravatar";

export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    components: {
        Gravatar,
    },
};
</script>
