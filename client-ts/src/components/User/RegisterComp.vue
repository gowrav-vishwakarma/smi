<template>
  <v-flex class="mx-2 py-4 px-2 card justify-center" xs12 md6 sm-6>
    <h2 class="head py-5">Get Yourself Registered!</h2>
    <v-form
      class="mt-3 d-flex flex-column"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="regForm.name"
        placeholder="Name"
        required
        outlined
        dense
        class="field"
      ></v-text-field>

      <v-text-field
        v-model="regForm.email"
        :rules="emailRules"
        placeholder="E-mail"
        outlined
        dense
        class="field"
        required
      ></v-text-field>
      <v-text-field
        v-model="regForm.password"
        placeholder="Enter your password"
        name="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        outlined
        dense
        class="field"
        @click:append="show1 = !show1"
        :rules="passwordRules"
      />

      <v-text-field
        v-model="regForm.confirmPassword"
        placeholder="Confirm your password"
        name="confirmPassword"
        type="password"
        outlined
        dense
        class="field"
        :rules="confirmPasswordRules"
      />
      <v-select
        v-model="regForm.languages"
        :items="languages"
        single-line
        auto
        outlined
        dense
        class="field"
        label="Languages Known (Speak, Write, Read)"
        multiple
      ></v-select>

      <v-select
        v-model="regForm.topics"
        :items="topics"
        single-line
        auto
        outlined
        dense
        class="field"
        label="Topics Interested In"
        multiple
      ></v-select>

      <v-select
        v-model="regForm.country"
        :items="countries"
        single-line
        auto
        outlined
        dense
        class="field mt-2"
        label="Country"
      ></v-select>
    </v-form>
    <v-btn class="lgnbtn mt-2" block @click="register" primary>Register </v-btn>
    <p>
      Already have an account ?
      <router-link class="text-decoration-none" to="/login">Login</router-link>
    </p>
  </v-flex>
</template>

<style>
@import url("https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap");
@import url("https://fonts.googleapis.com/css? family=Comfortaa&display=swap");

.head {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 29.05px;
  color: #000000;
}
.field {
  width: 596px;
  height: 58px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 24.2px;
  color: #777777;
}
.lgnbtn {
  width: 388px;
  height: 52px;
  border-radius: 12px;
  background-color: #69aefe !important;
  margin-bottom: 1rem;
}
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
