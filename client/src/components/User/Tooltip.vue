 <template>
 <v-tooltip bottom color="warning">
<template v-slot:activator="{ on, attrs }">
    <v-btn
    :to="`/userprofile/${question.userId}`"
    color="light"
    v-bind="attrs"
    v-on="on"
    >
        {{ questionerRating }}
    {{ question.by.name.split(" ")[0] }}
    </v-btn>
</template>
<span>
<v-icon small>mdi-circle</v-icon>
{{ question.by.name }} -
<br />
<span class="language caption">
[ {{ question.languages.join(", ") }} ] -
</span>
</span>
</v-tooltip>
</template>

<script>
export default{
    props:{
      question:Object
    }
}
</script>