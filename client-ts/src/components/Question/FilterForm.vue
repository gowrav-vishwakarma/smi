<template lang="pug">
    div.questionFilterComponent
      v-form(ref="filterForm" v-model="valid")
        v-text-field(label="Question Contains" dense small outlined v-model="filterQuery.query" :rules="[(v) => v.length <= 80 || 'Too long']")
        v-autocomplete(v-model="filterQuery.topics" dense small multiple :items="topics" small-chips label="Topic" outlined)
        v-combobox(v-model="filterQuery.tags" dense small outlined label="Tags" multiple small-chips clearable :delimiters="[',']" deletable-chips)
        v-autocomplete(:items="languageList" dense small v-model="filterQuery.languages" multiple label="Language" outlined)
        v-checkbox(label="questions having answer" dense small v-model="filterQuery.hasComments")
        div Available for solution
        .d-flex(style="align-items:center;flex-wrap:wrap;")
          v-checkbox(style="width:50%;" label="Chat" dense v-model="filterQuery.availableOnChatChannel")
          v-checkbox(style="width:50%;" label="Screen Share" dense v-model="filterQuery.availableOnScreenShare")
          v-checkbox(style="width:50%;" label="Video Call" dense v-model="filterQuery.availableOnVideoCall")
          v-checkbox(style="width:50%;" label="Audio Call" dense v-model="filterQuery.availableOnAudioCall")
        v-row
          v-col(cols="6")
            v-btn(color="grey"  @click="filterFormSubmit" :disabled="!valid" block) Close
          v-col(cols="6")
            v-btn(color="primary" @click="filterFormSubmit" :disabled="!valid" block) Search
</template>

<script lang="ts">
import { topics, languages } from "@/services/staticValues";
import { Component, Vue, Prop } from "vue-property-decorator";

import { VueEditor } from "vue2-editor";
import MulticorderUI from "@/components/Multicorder/MulticorderUI.vue";
import questionsApi from "@/services/questions.api";

@Component({
  name: "QuestionFilters",
  components: {
    VueEditor,
    MulticorderUI,
  },
})
export default class AskQuestionView extends Vue {
  @Prop()
  callback!: (any: any) => void;

  progress = 0;
  blob = null;
  filterQuery = {
    query: null,
    topics: null,
    tags: [],
    languages: [],
    hasComments: null,
    availableOnChatChannel: null,
    availableOnScreenShare: null,
    availableOnVideoCall: null,
    availableOnAudioCall: null,
  };

  topics: string[] = topics;
  valid: false = false;
  languageList: string[] = languages;

  async filterFormSubmit() {
    console.log("filterFormSubmit", this.filterQuery);

    if (this.callback) {
      this.callback(this.filterQuery);
    }

    // this.progress = 0;
    // var data = this.question;
    // data.languages = this.$store.getters.loggedInUser.userLanguages;
    // const newQuestion = await questionsApi.createQuestion(
    //   this.question,
    //   this.blob,
    //   (event) => {
    //     this.progress = Math.round((100 * event.loaded) / event.total);
    //   }
    // );
    // this.$router.push("question/" + newfilterQuery._id);
  }
}
</script>
