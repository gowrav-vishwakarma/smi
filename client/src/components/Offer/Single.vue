<template>
 <div>
     <small>
     <v-icon small>mdi-star</v-icon>
     {{userInfo.userRating}}
     </small>
     {{userInfo.userBy}}
     
 </div>
</template>

<script>
export default{
    props:{
        userInfo:Array
    }
}
</script>