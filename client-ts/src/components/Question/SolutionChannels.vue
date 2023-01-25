<template lang="pug">
  div(v-if="solutionChannels")
      v-icon(small class="icon mr-2" color="green" v-if="solutionChannels.audioCall") mdi-phone-incoming
      v-icon(small class="icon mr-2" color="red" v-else) mdi-phone-incoming
      v-icon(small class="icon mr-2" color="green" v-if="solutionChannels.chat") mdi-chat
      v-icon(small class="icon mr-2" color="red" v-else) mdi-chat
      v-icon(small v-if="solutionChannels.screenShare" color="green" class="mr-2") mdi-monitor
      v-icon(small v-else color="red" class="mr-2") mdi-monitor-off
      v-icon(small color="green" class="mr-2" v-if="solutionChannels.videoCall") mdi-video
      v-icon(small color="red" class="mr-2" v-else) mdi-video-off

</template>

<script lang="ts">
import "reflect-metadata";
import SolutionChannelsDTO from "@/dto/solution-channels.dto";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SolutionChannelsComponent",
})
export default class SolutionChannelsComponent extends Vue {
  @Prop({ default: null })
  readonly solutionChannels!: SolutionChannelsDTO | null;
}
</script>
