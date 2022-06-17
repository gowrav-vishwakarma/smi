<template>
    <v-flex class="mx-2 py-4 px-2 card" xs12 md6 sm-6>
        <v-card v-if="!submitted" class="px-3 py-3" color="white">
            <v-form ref="form" v-model="valid" lazy-validation>
                <div class="py-5">
                    <h2>Login</h2>
                </div>

                <v-text-field
                    v-model="logForm.emailL"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="logForm.passwordL"
                    label="Password"
                    prepend-icon="mdi-lock"
                    required
                    type="password"
                ></v-text-field>
                <v-btn class="primary" @click="login"> Login </v-btn>
            </v-form>
        </v-card>
    </v-flex>
</template>

<script>
import DataService from "@/services/DataService";

export default {
    data() {
        return {
            logForm: {
                emailL: "",
                passwordL: "",
            },
            valid: false,
            submitted: false,
            user: {},
            emailRules: [
                (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid",
            ],
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
                    this.user.token = response.data.token;
                    this.$store.commit("setCurrentUser", this.user);
                    let filter = {
                        topics: this.user.topic,
                        tags: [],
                        languages: this.user.languagesSpeaks,
                        isPaid: undefined,
                        sortBy: "newest",
                    };
                    this.$store.commit("updateFilters", filter);
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                    this.$vToastify.error(
                        "Could not login, Is your username or password correct?"
                    );
                });
        },
    },
};
</script>
