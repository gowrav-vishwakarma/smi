<template>
  <v-flex class="mx-2 py-4 px-2 card" xs12 md6 sm-6>
    <div class="d-flex flex-column justify-center align-center">
      <div class="py-5 d-flex flex-row jusity-center">
        <h2 class="head">Login to your Account</h2>
      </div>
      <div class="mt-3 d-flex">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="logForm.emailL"
            :rules="emailRules"
            placeholder="Enter your email id"
            outlined
            dense
            required
            class="field"
          ></v-text-field>

          <v-text-field
            v-model="logForm.passwordL"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            outlined
            dense
            class="field mt-2"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <div class="field mt-2 d-flex align-start justify-space-between">
            <span>
              <input type="checkbox" class="mr-1 ml-1" v-model="remember" />
              <label>Remember me</label>
            </span>
            <small>
              <router-link class="text-decoration-none" to="/forget"
                >Forget password?</router-link
              >
            </small>
          </div>
        </v-form>
      </div>
      <v-btn class="lgnbtn" @click="login"> Login </v-btn>
      <p>
        Not having an account ?
        <router-link class="text-decoration-none" to="/register"
          >Sign Up</router-link
        >
      </p>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserAPIService from "../../services/user.api";
import { CurrentUserI } from "../../types/CurrentUser";
import { AuthModule } from "../../store/module/auth";

@Component({
  name: "LoginComponent",
})
export default class LoginComponent extends Vue {
  private logForm = {
    emailL: "test@test.com",
    passwordL: "1234",
  };
  private showPassword = false;
  private remember = false;
  private valid = false;
  private submitted = false;
  private user = {};
  private emailRules = [
    (v: any) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "E-mail must be valid",
  ];

  async login() {
    const data = await UserAPIService.login({
      username: this.logForm.emailL,
      password: this.logForm.passwordL,
    }).catch((err: any) => {
      if (err.response && err.response.status === 401) {
        console.log("Username or password is incorrect");
      } else {
        console.log(err);
      }
    });
    if (data) {
      let user: CurrentUserI = {
        ...data.user,
        accessToken: data.accessToken,
      };
      user.accessToken = data.accessToken;
      AuthModule.setCurrentUser(user);
      let filter = {
        // topics: user.topic,
        tags: [],
        // languages: user.languagesSpeaks,
        isPaid: undefined,
        sortBy: "newest",
      };
      //   this.$store.commit("updateFilters", filter);
      //   this.$router.push("/");
    }
  }
}
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap");
@import url("https://fonts.googleapis.com/css? family=Comfortaa&display=swap"); */

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
