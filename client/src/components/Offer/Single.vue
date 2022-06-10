<template>
 <div>
     <small>
     <v-icon small>mdi-star</v-icon>
     {{userInfo.userRating}}
     </small>
     {{userInfo.userBy}}
     <v-btn class="tagg" @click="show" v-if="userInfo.description">know</v-btn>
     <modal v-if="userInfo.description" name="Desc">
        <p>{{userInfo.description}}</p>
    </modal>
 </div>
</template>

<style>
.tagg{
    border-radius: 15px;
    width: auto!important;
    max-height: 1rem!important;
    background-color: rgb(222, 194, 194)!important;;
    margin: 0rem .3rem;
    padding: 0rem!important;
    font-size: .6rem!important;
}
</style>

<script>
export default{
    props:{
        userInfo:Object
    },
    methods:{
        show () {
            this.$modal.show('Desc');
        },
    }
}
</script>