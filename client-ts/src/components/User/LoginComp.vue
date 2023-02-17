<template>
  <div class="d-flex flex-column align-center">
    <h2 class="head py-5">Login to your Account</h2>
    <div class="mt-3">
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
    <v-btn class="lgnbtn" @click="login" block color="primary" rounded>
      Login
    </v-btn>
    <p>
      Not having an account ?
      <router-link class="text-decoration-none" to="/register"
        >Sign Up</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthStoreModule } from "@/store";
import UserAPIService from "../../services/user.api";
import { CurrentUserI } from "@/store/module/auth";

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
  private emailRules = [
    (v: any) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "E-mail must be valid",
  ];

  async login() {
    if (!this.valid) return;

    const data = await UserAPIService.login({
      username: this.logForm.emailL,
      password: this.logForm.passwordL,
    }).catch((err: any) => {
      if (err.response?.status === 401) {
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
      await AuthStoreModule.setCurrentUserAction(user);
      console.log(AuthStoreModule.token);
      // let filter = {
      //   // topics: user.topic,
      //   tags: [],
      //   // languages: user.languagesSpeaks,
      //   isPaid: undefined,
      //   sortBy: "newest",
      // };
      //   this.$store.commit("updateFilters", filter);
      this.$router.push("/");
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
/* .lgnbtn {
  width: 388px;
  height: 52px;
  border-radius: 12px;
  background-color: #69aefe !important;
  margin-bottom: 1rem;
} */
</style>
