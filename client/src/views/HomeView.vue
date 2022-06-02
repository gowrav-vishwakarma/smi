<template>
  <v-container>
    <v-layout>
      <h1>Home page</h1>
       <span>{{usersFromStore.fullName}}</span>
       <span>{{usersFromStore.email}}</span>
       <span>{{usersFromStore.id}}</span>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  computed: {
    usersFromStore() {
      console.log(this.$store.state.data)
      return this.$store.state.data;
    },
  },
};
</script>