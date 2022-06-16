<template>
<v-container fill-height>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="4">
            <h1>404 Error</h1>
        <p>{{ message }}</p>
        <v-btn small class="orange" to="/" exact>
            Go to home page
        </v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<style>

</style>

<script>
export default{
    data(){
        return{
            message: this.$store.getters.CurrentError.message
        }
    }
}
</script>