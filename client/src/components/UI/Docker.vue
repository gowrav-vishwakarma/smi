<template>
 <v-container class="d-flex flex-column docker">
     <div class="text-left d-flex flex-column">
          <v-btn small class="mb-2" v-for="nm in ['Home','Notifications','Language','Saved Question']" :key="nm">
           {{nm}}
          </v-btn>
       </div>
       <v-divider class="mt-3"></v-divider>
       
       <div class="google mt-3">
            
       </div>
 </v-container>
</template>

<style>
.docker{
    width: 17rem;
    border: 1px solid grey;
}
</style>

<script>
export default{
    data(){
        return{
          desc:''   
        };
    },
}
</script>