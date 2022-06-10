<template>
<v-container>
    <v-row>
        <v-col cols="12"
        md="12"
        sm="12"
        >
          <v-card
          class="pa-2"
          outlined
          tile
        >

         <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
           <h3>
            {{ question.title }}
        </h3>
        </v-card>
      </v-col>
      </v-row>

         <v-row>
             <v-col
        cols="8"
      >
        <video controls width="100%" v-if="this.question.video" :src="this.question.video"></video>
  
      </v-col>
      <v-col
        cols="12"
        md="12"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
           {{ shortdetail }}
        </v-card>
      </v-col>
      </v-row>

         <v-row>
      <v-col>
        <v-btn class="tag" v-for="tag in question.tags" :key="tag">
        {{ tag }}
        </v-btn>
      </v-col>

      <v-spacer></v-spacer>

      <v-col>
           <v-icon small>mdi-circle</v-icon>
          {{question.by}} - 
          <span class="language">
          [<i v-for="l in question.languages" :key="l">
             {{l}}
          </i>] - {{question.createdAt}}
          </span>
      </v-col>
    </v-row>

  
        </v-card>
        </v-col>
 </v-row>
</v-container>
</template>

<script>

import S from "string";
export default {
    computed:{
      shortdetail() {
            return S(this.question.detail).stripTags().truncate(100).s;
        }
    },
    props: {
        question: Object,
    }
};
</script>
