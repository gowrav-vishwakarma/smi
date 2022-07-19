<template lang="pug">
  v-card(class="mb-2 pa-2")
    .d-flex.flex-column
      .d-flex
        h4
          a(to="/ask-question") {{ question.title }}
        .ml-auto
          v-icon(class="icon mr-2" small color="green") mdi-chat
          v-icon(small v-if="question.solutionChannels.screenShare" color="green" class="mr-2") mdi-monitor
          v-icon(small v-else color="red" class="mr-2") mdi-monitor-off
          v-icon(small color="green" class="mr-2" v-if="question.solutionChannels.videoCall") mdi-video
          v-icon(small color="red" class="mr-2" v-else) mdi-video-off
      .caption {{ shortdetail }}
      .d-flex.flex-column
        .d-flex.align-center
          user-avatar.ml-auto(:user="question.byUser")
          .caption.ml-1 {{ question.byUser.name }} 
        .caption.ml-auto.mt-n1
          v-icon(small) mdi-star
          | {{ question.byUser.reputationAsQuestioner.totalMarkedSolved }}
        .d-flex
          .caption 0 Votes, 0 Answers, 0 Offers, 0 Comments
          .caption.ml-auto {{ humanized_time_span(question.createdAt) }}

  //-     <div class="d-flex flex-column justify-start" cols="3">
  //-       <small class="d-flex flex-column justify-end text-right">
  //-         <div>Asked {{ humanized_time_span(question.createdAt) }}</div>
  //-         <div class="d-flex justify-end">
  //-           <div><v-icon small>mdi-eye</v-icon> 10 views</div>
  //-           <v-icon class="ml-1">mdi-send</v-icon>
  //-         </div>
  //-       </small>
  //-     </div>
  //-   </div>
  //-   <div class="d-flex justify-space-between mb-0 caption">
  //-     <div>
  //-       <p>{{ shortdetail }}</p>
  //-     </div>
  //-     <div class="mb-0">
  //-       <v-dialog v-model="dialog" width="500">
  //-         <template v-slot:activator="{ on, attrs }">
  //-           <v-btn color="lighten-2" v-bind="attrs" v-on="on">
  //-             <v-icon large>mdi-youtube</v-icon>
  //-           </v-btn>
  //-           <p class="text-center mt-1">Media</p>
  //-         </template>

  //-         <v-card>
  //-           <v-card-text>
  //-             <video
  //-               width="100%"
  //-               controls
  //-               v-if="question.video"
  //-               :src="question.video"
  //-             ></video>
  //-           </v-card-text>
  //-         </v-card>
  //-       </v-dialog>
  //-     </div>
  //-   </div>
  //-   <v-divider></v-divider>

  //-   <div class="d-flex justify-space-between pl-3 pr-3 mb-2">
  //-     <div class="d-flex flex-column align-center">
  //-       <div>
  //-         Tags:
  //-         <v-chip
  //-           label
  //-           v-for="tag in question.tags"
  //-           :key="tag"
  //-           class="mr-1 curve"
  //-           color="grey lighten-3"
  //-         >
  //-           {{ tag }}
  //-         </v-chip>
  //-       </div>
  //-     </div>
  //-     <div class="d-flex flex-row justify-space-around align-center mt-1">
  //-       <v-btn small :disabled="disable" v-if="!voted" class="mr-2">
  //-         <v-icon>mdi-thumb-up</v-icon>{{ votes }}
  //-       </v-btn>
  //-       <v-btn small :disabled="disable" v-if="voted" class="mr-2 primary">
  //-         <v-icon>mdi-thumb-up</v-icon>{{ votes }}
  //-       </v-btn>
  //-       <v-btn
  //-         small
  //-         :disabled="disable"
  //-         v-if="!reported"
  //-         class="mr-2 text-danger"
  //-       >
  //-         <v-icon>mdi-thumb-down</v-icon>{{ reports }}
  //-       </v-btn>
  //-       <v-btn
  //-         small
  //-         :disabled="disable"
  //-         v-if="reported"
  //-         class="mr-2 red lighten-1 text-light"
  //-       >
  //-         <v-icon>mdi-thumb-down</v-icon>
  //-       </v-btn>

  //-       <v-btn v-if="disable" small class="mr-2">Login to React</v-btn>

  //-       <div class="d-flex flex-column mt-3 ml-1">
  //-         <v-btn class="curve mb-1"
  //-           >{{ question.questionValue.totalCommentsCount }} comments</v-btn
  //-         >
  //-         <p>
  //-           {{ question.questionValue.totalOfferingCount }} Solution offered
  //-         </p>
  //-       </div>
  //-     </div>
  //-   </div>
  //- </v-card>
</template>

<script lang="ts">
import S from "string";
import UserAvatar from "@/components/User/Avatar.vue";
import { Component, Prop, Mixins } from "vue-property-decorator";
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import { General } from "@/mixins/general";

// import DataService from "@/services/DataService";

@Component({
  name: "QuestionSingle",
  components: {
    UserAvatar,
  },
})
export default class QuestionSingle extends Mixins(General) {
  @Prop() readonly question!: QuestionListResponseDTO;
  dialog = false;
  reported = false;
  disable = false;
  voted = false;
  votes = 0;
  reports = 0;

  get shortdetail() {
    return S(this.question.detail).truncate(100).s;
  }
}
</script>
