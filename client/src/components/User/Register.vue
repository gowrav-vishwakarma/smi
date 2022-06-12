<template>
    <v-flex class="mx-2 py-4 px-2 card" xsauto>
        <v-card class="px-3 py-3" color="white">
            <v-form ref="form" v-model="valid" lazy-validation>
                <div class="py-5">
                    <h2>Register</h2>
                </div>

                <v-text-field
                    v-model="regForm.Name"
                    label="Full Name"
                    prepend-icon="mdi-account"
                    required
                ></v-text-field>

                <!-- <v-text-field
                    v-model="regForm.username"
                    label="Username"
                    prepend-icon="mdi-alpha-u-box"
                    required
                ></v-text-field> -->
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
                    :rules="passwordRules"
                />

                <v-text-field
                    v-model="regForm.confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="confirmPasswordRules"
                />
                <v-select
                    v-model="regForm.language"
                    :items="languages"
                    single-line
                    auto
                    prepend-icon="book"
                    label="Languages Known (Speak, Write, Read)"
                    multiple
                ></v-select>

                <v-select
                    v-model="regForm.topic"
                    :items="topics"
                    single-line
                    auto
                    prepend-icon="topic"
                    label="Topics Interested In"
                    multiple
                ></v-select>

                <v-select
                    v-model="regForm.country"
                    :items="countries"
                    single-line
                    auto
                    prepend-icon="language"
                    label="Country"
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
                languages: [],
                topics: [],
                countries: [],
            },
            emailRules: [
                (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid",
            ],
            passwordRules: [
                (value) => !!value || "Please type password.",
                (value) =>
                    (value && value.length >= 6) || "minimum 6 characters",
            ],
            confirmPasswordRules: [
                (value) => !!value || "type confirm password",
                (value) =>
                    value === this.regForm.password ||
                    "The password confirmation does not match.",
            ],
            topics,
            languages,
            countries,
        };
    },
    methods: {
        register() {
            var data = {
                email: this.regForm.email,
                name: this.regForm.Name,
                username: this.regForm.email, //email as username also
                password: this.regForm.password,
                languagesSpeaks: this.regForm.language,
                country: this.regForm.country,
                topic: this.regForm.topic,
            };
            DataService.Register(data)
                .then((response) => {
                    this.regForm = {
                        email: "",
                        name: "",
                        username: "",
                        password: "",
                        confirmPassword: "",
                        languages: [],
                        topics: [],
                        countries: [],
                    };
                    this.$vToastify.success(
                        "User has been registered, please login"
                    );
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
