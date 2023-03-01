<template>
  <div class="align-center">
    <h3 class="text-h5 pa-3">Get Yourself Registered!</h3>
    <div class="mt-6">
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- <v-row>
          <v-col cols="6" md="6" lg="6" sm="12" xs="12" class="ma-0 pa-2 pt-0 pb-0"> -->
        <div class="d-flex" style="gap: 3%">
          <v-text-field
            style="width: 35%"
            v-model="regForm.name"
            label="Your Name"
            required
            outlined
            class="field"
            dense
          ></v-text-field>
          <!-- </v-col>
          <v-col cols="6" md="6" lg="6" sm="12" xs="12" class="ma-0 pa-2 pt-0 pb-0"> -->
          <v-text-field
            style="width: 35%"
            v-model="regForm.email"
            :rules="emailRules"
            label="Email Id"
            outlined
            class="field"
            required
            dense
          ></v-text-field>

          <!-- </v-col> -->

          <!-- <v-col cols="6" md="6" lg="6" sm="12" xs="12" class="ma-0 pa-2 pt-0 pb-0"> -->
        </div>
        <div class="d-flex" style="gap: 3%">
          <v-text-field
            style="width: 35%"
            v-model="regForm.password"
            placeholder="Enter your password"
            name="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            outlined
            class="field"
            @click:append="show1 = !show1"
            :rules="passwordRules"
            label="password"
            dense
          />
          <v-text-field
            style="width: 35%"
            v-model="regForm.confirmPassword"
            placeholder="Confirm your password"
            name="confirmPassword"
            label="confirm Password"
            type="password"
            outlined
            class="field"
            :rules="confirmPasswordRules"
            dense
          />
        </div>
        <!-- </v-col> -->
        <!-- <v-col
            cols="6"
            md="6"
            lg="6"
            sm="12"
            xs="12"
            class="ma-0 pa-2 pt-0 pb-0"
          > -->

        <!-- </v-col> -->
        <!-- </v-row> -->
        <v-select
          v-model="regForm.languages"
          :items="languages"
          single-line
          auto
          outlined
          class="field"
          label="Languages Known (Speak, Write, Read)"
          multiple
          dense
        ></v-select>

        <v-select
          v-model="regForm.topics"
          :items="topics"
          single-line
          auto
          outlined
          class="field"
          label="Topics Interested In"
          multiple
          dense
        ></v-select>

        <v-select
          v-model="regForm.country"
          :items="countries"
          single-line
          auto
          outlined
          class="field mt-2"
          label="Country"
          dense
        ></v-select>
        <v-btn class="lgnbtn mt-2" block @click="register" color="orange" dark>
          Register
        </v-btn>
      </v-form>

      <p class="pt-4">
        Already have an account ?
        <router-link class="text-decoration-none" to="/login"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap");
@import url("https://fonts.googleapis.com/css? family=Comfortaa&display=swap");

/* .head {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 29.05px;
  color: #000000;
} */
/* .field {
  width: 596px;
  height: 58px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 24.2px;
  color: #777777;
} */
/* .lgnbtn {
  width: 388px;
  height: 52px;
  border-radius: 12px;
  background-color: #69aefe !important;
  margin-bottom: 1rem;
} */
</style>

<script lang="ts">
import { topics, languages, countries } from "@/services/staticValues";
import { Component, Vue } from "vue-property-decorator";

import UserAPIService from "../../services/user.api";
import RegisterUserDTO from "../../dto/request/register.dto";

@Component
export default class RegisterComponent extends Vue {
  valid = false;
  show1 = false;
  regForm = {
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    languages: [],
    topics: [],
    country: "",
  };
  emailRules = [
    (v: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "E-mail must be valid",
  ];
  passwordRules = [
    (value: string) => !!value || "Please type password.",
    (value: string) => (value && value.length >= 6) || "minimum 6 characters",
  ];
  confirmPasswordRules = [
    (value: string) => !!value || "type confirm password",
    (value: string) =>
      value === this.regForm.password ||
      "The password confirmation does not match.",
  ];
  topics = topics;
  languages = languages;
  countries = countries;

  register() {
    var data: RegisterUserDTO = {
      email: this.regForm.email,
      name: this.regForm.name,
      password: this.regForm.password,
      languagesSpeaks: this.regForm.languages,
      country: this.regForm.country,
      topicsInterestedIn: this.regForm.topics,
      accountType: "INDIVIDUAL",
    };

    UserAPIService.register(data).then((res) => {
      this.$router.push("/login");
    });
  }
}
</script>
