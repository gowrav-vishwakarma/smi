<template>
    <v-flex class="mx-2 py-4 px-2 card" xsauto>
        <v-card class="px-3 py-3" color="white">
            <v-form ref="form" v-model="valid" lazy-validation>
                <div class="py-5">
                    <h2>Register</h2>
                </div>

                <v-text-field
                    v-model="regForm.Name"
                    label="Name"
                    prepend-icon="mdi-account"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="regForm.username"
                    label="Username"
                    prepend-icon="mdi-alpha-u-box"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="regForm.email"
                    :rules="emailRules"
                    label="Email"
                    prepend-icon="mdi-email"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="regForm.password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="regForm.passwordRules"
                />
                <!-- 
<v-text-field
  v-model="regForm.confirmPassword"
  label="Confirm Password"
  name="confirmPassword"
  prepend-icon="mdi-lock"
  type="password"
  :rules="regForm.confirmPasswordRules"
/> -->
                <v-select
                    v-model="regForm.language"
                    :items="regForm.languages"
                    single-line
                    auto
                    prepend-icon="book"
                    label="Language"
                    multiple
                ></v-select>

                <v-select
                    v-model="regForm.country"
                    :items="regForm.countries"
                    single-line
                    auto
                    prepend-icon="language"
                    label="Country"
                ></v-select>

                <v-select
                    v-model="regForm.Topic"
                    :items="regForm.topics"
                    single-line
                    auto
                    prepend-icon="topic"
                    label="Topics"
                    multiple
                ></v-select>

                <v-btn class="primary" @click="register"> Register </v-btn>
            </v-form>
        </v-card>
    </v-flex>
</template>

<script>
import DataService from "@/services/DataService";
import { topics, languages, countries } from "@/services/staticValues";

export default {
    data() {
        return {
            valid: false,
            regForm: {
                email: "",
                name: "",
                username: "",
                password: "",
                confirmPassword: "",
                passwordRules: [
                    (value) => !!value || "Please type password.",
                    (value) =>
                        (value && value.length >= 6) || "minimum 6 characters",
                ],
                confirmPasswordRules: [
                    (value) => !!value || "type confirm password",
                    (value) =>
                        value === this.password ||
                        "The password confirmation does not match.",
                ],
                languages,
                topics,
                countries,
            },
            emailRules: [
                (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid",
            ],
        };
    },
    methods: {
        register() {
            var data = {
                email: this.regForm.email,
                name: this.regForm.Name,
                username: this.regForm.username,
                password: this.regForm.password,
                languagesSpeaks: this.regForm.language,
                country: this.regForm.country,
                topic: this.regForm.Topic,
            };
            DataService.Register(data)
                .then((response) => {
                    this.$vToastify.success("easy-peasy");
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
