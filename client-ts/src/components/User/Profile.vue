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
          v-card(flat)
            v-card-title Rakesh 
              v-btn(small text)
                v-icon(color="red") mdi-map-marker
                | Ahmedabad
            v-card-subtitle
              .d-flex
                span.text-subtitle-1 Ux-Designer &  Current working  
                span.text-subtitle-1.ml-4 
                  small . Full Time
              v-divider
              .d-flex.mt-2
                div 845 Followers
                div.ml-4(style="width:10px;")
                  v-divider(vertical)
                div 500 + connection

          v-container
            v-form(ref="userSkillForm")
              .d-flex
              h5.mb-2(class="text-h5 font-weight-regular ") Top Skills
                v-btn.ml-4(icon color="primary")
                  v-icon mdi-pencil  
              v-combobox( v-model="userSkills" :items="skillList" label="" multiple chips filled)
            .userExperienceContainer
            v-form(ref="userExperienceForm")
              .d-flex
                h5.mb-2(class="text-h5 font-weight-regular ") Experience
                v-btn.ml-4(icon color="primary")
                  v-icon mdi-plus
            div.mt-4
              v-card.mb-4(v-for="(experience, index) in userExperienceList" :key="index")
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
          v-card
            v-card-title Todo Rating as Questioner
          v-card
            v-card-title Todo Rating as Answer
          v-card(class="mx-auto")
            //- v-img(src="https://cdn.vuetifyjs.com/images/lists/ali.png", height="300px", dark)
              v-row(class="fill-height")
                v-card-title
                  v-btn(dark, icon)
                    v-icon mdi-chevron-left
                  v-spacer
                  v-btn(dark, icon, class="mr-4")
                    v-icon mdi-pencil
                  v-btn(dark, icon)
                    v-icon mdi-dots-vertical
                v-spacer
                v-card-title.white--text.pl-12.pt-12
                  div.text-h4.pl-12.pt-12 Ali Conners
            v-list(two-line)
              v-list-item
                v-list-item-icon
                  v-icon(color="indigo") mdi-phone
                v-list-item-content
                  v-list-item-title (650) 555-1234
                  v-list-item-subtitle Mobile
                v-list-item-icon
                  v-icon mdi-message-text
              v-list-item
                v-list-item-action
                v-list-item-content
                  v-list-item-title (323) 555-6789
                  v-list-item-subtitle Work
                v-list-item-icon
                  v-icon mdi-message-text
              v-divider(inset)
              v-list-item
                v-list-item-icon
                  v-icon(color="indigo") mdi-email
                v-list-item-content
                  v-list-item-title aliconnors@example.com
                  v-list-item-subtitle Personal
              v-list-item
                v-list-item-action
                v-list-item-content
                  v-list-item-title ali_connors@example.com
                  v-list-item-subtitle Work
              v-divider(inset)
              v-list-item
                v-list-item-icon
                  v-icon(color="indigo") mdi-map-marker
                v-list-item-content
                  v-list-item-title 1400 Main Street
                  v-list-item-subtitle Orlando, FL 79938
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { skills } from "@/services/staticValues";
import userExperience from "../../dto/user/experience.dto";
// import QuestionerSignature from "@/components/User/Signature/AsQuestioner.vue";
import UserRating from "@/components/User/Rating.vue";

@Component({
  name: "UserProfile",
  components: {
    UserRating,
  },
})
export default class UserProfileComponent extends Vue {
  @Ref() userSkillForm!: HTMLFormElement;

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
}
</script>
