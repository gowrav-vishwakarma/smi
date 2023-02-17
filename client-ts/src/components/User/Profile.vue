<template lang="pug">
    v-container
      v-card.mx-auto.mb-6
        v-img(height="180px" style="overflow:visible;" cover src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg")
          .d-flex
            v-avatar.ml-2(color="grey" size="150" rounded="50%" style="position: absolute;bottom:-20px;")
              v-img(cover src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg")
            v-btn.ml-auto(icon large elevation="2" )
              v-icon(dark) mdi-pencil
      v-row
        v-col(cols="8")
          div
            v-card(flat)
              v-btn(small icon rounted @click="editProfile=true")
                v-icon mdi-pencil
              v-card-title {{this.profile.name}} 
                v-btn(small text)
                  v-icon(color="red") mdi-map-marker
                  | {{this.profile.city}} {{this.profile.state}} {{this.profile.country}}
              v-card-subtitle
                .d-flex
                  span.text-subtitle-1 {{this.profile.post}}  
                  span.text-subtitle-1.ml-4 
                    small . {{this.profile.jobType}}
                v-divider
                .d-flex.mt-2
                  div(v-if="this.profile.asFollowers") {{this.profile.asFollowers.totalFollowers}} Followers
                  div.ml-4(style="width:10px;")
                    v-divider(vertical)
                  div(v-if="this.profile.asFollowing") {{this.profile.asFollowing.totalFollowing}}  Connections
            v-dialog.editing-dialog(v-model="editProfile" persistent)
              v-edit-dialog(:open.sync="editProfile" @save="saveProfile" @cancel="cancelProfile")
                v-card
                  v-card-title Edit Profile
                  v-card-text
                    v-form
                      v-text-field(v-model="profile.name" label="name")
                      v-text-field(v-model="profile.city" label="city")
                      v-text-field(v-model="profile.state" label="state")
                      v-text-field(v-model="profile.country" label="country")
                      v-text-field(v-model="profile.post" label="post")
                      v-text-field(v-model="profile.jobType" label="jobType")
                  v-card-actions
                    v-spacer
                    v-btn(@click="editProfile = false") Cancel
                    v-btn(color="primary" @click="saveProfile") Save
          v-container
            v-form(ref="userSkillForm")
              .d-flex
              h5.mb-2(class="text-h5 font-weight-regular ") Top Skills
                v-btn.ml-4(icon color="primary")
                  v-icon mdi-pencil  
              v-combobox( v-model="profile.skills" :items="skillList" label="" multiple chips filled)
            .userExperienceContainer
            v-form(ref="userExperienceForm")
              .d-flex
                h5.mb-2(class="text-h5 font-weight-regular ") Experience
                v-btn.ml-4(icon color="primary")
                  v-icon mdi-plus
            div.mt-4
              v-card.mb-4(v-for="(experience, index) in profile.experiences" :key="index")
                v-list-item.ma-0(three-line)
                  v-list-item-content
                    v-list-item-title  {{experience.companyName}}
                    v-list-item-subtitle {{experience.post}}
                      small.ml-4 . {{experience.jobType}}
                    v-list-item-subtitle 
                      .d-flex
                        p {{experience.from}} - {{experience.to}}
                        p.ml-auto {{experience.city}} {{experience.state}} {{experience.country}}
                v-container.pa-0.ma-0(style='width="60% !important"')
                  v-divider
                v-container
                  v-list-item-title Role
                    div(v-html="experience.role")
                  v-list-item-title Description
                    div(v-html="experience.description")
                v-divider

        v-col(cols="4")
          v-card.mt-4
            v-card-title Todo Rating as Questioner
          v-card.mt-4
            v-card-title Todo Rating as Answer
          v-card.mt-4
            v-list
              v-list-item
                v-list-item-icon
                  v-icon(color="indigo" small) mdi-phone
                v-list-item-content
                  v-list-item-title {{profile.contactNo}}
                  v-list-item-subtitle contactNo
                v-list-item-icon
                  v-icon mdi-message-text
              v-divider(inset)
              v-list-item
                v-list-item-icon
                  v-icon(color="indigo" small) mdi-email
                v-list-item-content
                  v-list-item-title {{profile.email}}
                  v-list-item-subtitle work
          v-card.mt-4
            v-list
              div(v-for="(profileId, name) in profile.socialProfile" :key="name")
                v-list-item
                  v-list-item-icon
                    v-icon(color="indigo") mdi-{{name.toLowerCase()}}
                  v-list-item-content
                    v-list-item-title {{profileId}}
                    v-list-item-subtitle {{name}}
                  v-list-item-icon
                    v-icon(small) mdi-pencil
                v-divider(inset)
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { skills } from "@/services/staticValues";
import userExperience from "../../dto/user/experience.dto";
// import profileDto from "../../dto/user/profile.dto";
// import QuestionerSignature from "@/components/User/Signature/AsQuestioner.vue";
import UserRating from "@/components/User/Rating.vue";
import UserApiService from "@/services/user.api";

@Component({
  name: "UserProfile",
  components: {
    UserRating,
  },
})
export default class UserProfileComponent extends Vue {
  @Ref() userSkillForm!: HTMLFormElement;
  //Editing Form
  editProfile = false;

  userSkills: string[] = [];
  skillList: string[] = skills;

  userExperienceList: userExperience[] = [
    {
      companyName: "Areli Commerce ",
      post: "Developer",
      from: "July 2018",
      to: "Current",
      city: "Ahmedabad",
      state: "Gujrat",
      country: "India",
      jobType: "Full Time",
      role: "<p> -> Constructing solutions for B2B and B2C business needs <br/>-> Working on Graphics for Marketing and Merchandising departments whenever required <br/>-> Conversations & Feedbacks from other departments</p>",
      description:
        "<p>Full Stack Developer </p> <h2>Creating all Frontend & backend</h2>",
    },
    {
      companyName: "Frendy",
      post: "Developer",
      from: "July 2018",
      to: "Current",
      city: "Ahmedabad",
      state: "Gujrat",
      country: "India",
      jobType: "Full Time",
      role: "<p>Full Stack Developer </p> <h2>Creating all Frontend & backend</h2>",
      description:
        "<p>Full Stack Developer </p> <h2>Creating all Frontend & backend</h2>",
    },
  ];

  profile: object = {};

  async mounted() {
    this.profile = await UserApiService.getProfile(
      this.$store.getters.loggedInUser._id
    );

    // if (!this.profile.hasOwnProperty("experiences")) {
    // this.profile["experiences"] = [];
    // }
  }

  saveProfile() {
    console.log("save profile methods");
    this.editProfile = false;
  }

  cancelProfile() {
    console.log("cancel profile methods");
    this.editProfile = false;
  }
}
</script>

<style>
.v-dialog {
  width: auto;
}
</style>
