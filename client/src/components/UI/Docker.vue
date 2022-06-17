<template>
    <v-container class="d-flex flex-column docker">
        <div class="text-left d-flex flex-column">
            <v-btn
                small
                text
                class="mb-2"
                v-for="nm in [
                    'Home',
                    'Notifications',
                    'Language',
                    'Saved Question',
                ]"
                :key="nm"
            >
                {{ nm }}
            </v-btn>
        </div>
        <v-divider class="mt-3"></v-divider>

        <div class="google mt-3"></div>
    </v-container>
</template>

<style>
.docker {
    width: 17rem;
    border-right: 1px solid lightgray;
}
</style>

<script>
export default {
    data() {
        return {
            desc: "",
        };
    },
};
</script>
