<template>
    <v-flex class="mx-2 py-4 px-2 card" xs12 md6 sm-6>
        <div class="d-flex flex-column justify-center align-center">
            <div class="py-5 d-flex flex-row jusity-center">
                    <h2 class="head">Get Yourself Registered!</h2>
                </div>
       <div class="mt-3 d-flex">      
            <v-form ref="form" v-model="valid" lazy-validation>
               
                <v-text-field
                    v-model="regForm.Name"
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
                    v-model="regForm.language"
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
                    v-model="regForm.topic"
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
       </div>
             <v-btn class="lgnbtn mt-2" @click="register">Register </v-btn>
             <p>Already have an account ? <router-link class="text-decoration-none" to="/login">Login</router-link> </p>
            </div>
    </v-flex>
</template>

<style>
@import url('https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css? family=Comfortaa&display=swap');

.head{
font-family: 'Inter', sans-serif;
font-weight: 400;
font-size: 24px;
line-height: 29.05px;
color: #000000;
}
.field{
    width: 596px;
    height: 58px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 24.2px;
    color: #777777;
}
.lgnbtn{
    width: 388px;
    height: 52px;
    border-radius: 12px;
    background-color: #69AEFE!important;
    margin-bottom: 1rem;
}

</style>

<script>
import DataService from "@/services/DataService";
import { topics, languages, countries } from "@/services/staticValues";

export default {
    data() {
        return {
            valid: false,
            show1:false,
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
                        "User has been registered, please Login"
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
