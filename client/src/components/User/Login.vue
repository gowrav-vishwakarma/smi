<template>
    <v-flex class="mx-2 py-4 px-2 card" xs12 md6 sm-6>
        <v-card v-if="!submitted" class="px-3 py-3" color="white">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text class="py-5">
                    <h2>Login</h2>
                </v-text>

                <v-text-field
                    v-model="logForm.emailL"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="logForm.passwordL"
                    :rules="emailRules"
                    label="Password"
                    prepend-icon="mdi-lock"
                    required
                ></v-text-field>
                <v-btn class="primary" @click="login"> Login </v-btn>
            </v-form>
        </v-card>
    </v-flex>
</template>

<script>
import DataService from "@/services/DataService";
import { topics, countries } from "@/services/staticValues";

export default {
    data() {
        return {
            logForm: {
                emailL: "",
                passwordL: "",
            },
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
                languages: [
                    "Mandarin Chinese",
                    "Spanish",
                    "English",
                    "Hindi/Urdu",
                    "Arabic",
                    "Bengali",
                    "Portuguese",
                    "Russian",
                    "Japanese",
                    "German",
                    "Javanese",
                    "Punjabi",
                    "Wu",
                    "French",
                    "Telugu",
                    "Vietnamese",
                    "Marathi",
                    "Korean",
                    "Tamil",
                    "Italian",
                    "Turkish",
                    "Cantonese/Yue",
                ],
                topics: topics,
                countries: countries,
            },
            user: {},
        };
    },
    methods: {
        login() {
            var data = {
                email: this.logForm.emailL,
                password: this.logForm.passwordL,
            };
            DataService.Login(data)
                .then((response) => {
                    console.log(response.data);
                    this.user = response.data.user;
                    this.$store.commit("setCurrentUser", this.user);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
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
