<template>
    <v-flex class="mx-2 py-4 px-2 card" xsauto>
        <v-card class="px-3 py-3" color="white">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text class="py-5">
                    <h2>Register</h2>
                </v-text>

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
                topics: [
                    "Accounting",
                    "Advertising",
                    "Aerospace",
                    "Agriculture",
                    "Architecture",
                    "Banking",
                    "Technology",
                    "Other",
                    "Utilities",
                ],
                countries: [
                    "Afghanistan",
                    "Albania",
                    "Algeria",
                    "American Samoa",
                    "Andorra",
                    "Angola",
                    "Anguilla",
                    "Antarctica",
                    "Antigua and Barbuda",
                    "Argentina",
                    "Armenia",
                    "Aruba",
                    "Australia",
                    "Austria",
                    "Azerbaijan",
                    "Bahamas (the)",
                    "Bahrain",
                    "Bangladesh",
                    "Barbados",
                    "Belarus",
                    "Belgium",
                    "Belize",
                    "Benin",
                    "Bermuda",
                    "Bhutan",
                    "Bolivia (Plurinational State of)",
                    "Bonaire, Sint Eustatius and Saba",
                    "Bosnia and Herzegovina",
                    "Botswana",
                    "Bouvet Island",
                    "Brazil",
                    "British Indian Ocean Territory (the)",
                    "Brunei Darussalam",
                    "Bulgaria",
                    "Burkina Faso",
                    "Burundi",
                    "Cabo Verde",
                    "Cambodia",
                    "Cameroon",
                    "Canada",
                    "Cayman Islands (the)",
                    "Central African Republic (the)",
                    "Chad",
                    "Chile",
                    "China",
                    "Christmas Island",
                    "Cocos (Keeling) Islands (the)",
                    "Colombia",
                    "Comoros (the)",
                    "Congo (the Democratic Republic of the)",
                    "Congo (the)",
                    "Cook Islands (the)",
                    "Costa Rica",
                    "Croatia",
                    "Cuba",
                    "Curaçao",
                    "Cyprus",
                    "Czechia",
                    "Côte d'Ivoire",
                    "Denmark",
                    "Djibouti",
                    "Dominica",
                    "Dominican Republic (the)",
                    "Ecuador",
                    "Egypt",
                    "El Salvador",
                    "Equatorial Guinea",
                    "Eritrea",
                    "Estonia",
                    "Eswatini",
                    "Ethiopia",
                    "Falkland Islands (the) [Malvinas]",
                    "Faroe Islands (the)",
                    "Fiji",
                    "Finland",
                    "France",
                    "French Guiana",
                    "French Polynesia",
                    "French Southern Territories (the)",
                    "Gabon",
                    "Gambia (the)",
                    "Georgia",
                    "Germany",
                    "Ghana",
                    "Gibraltar",
                    "Greece",
                    "Greenland",
                    "Grenada",
                    "Guadeloupe",
                    "Guam",
                    "Guatemala",
                    "Guernsey",
                    "Guinea",
                    "Guinea-Bissau",
                    "Guyana",
                    "Haiti",
                    "Heard Island and McDonald Islands",
                    "Holy See (the)",
                    "Honduras",
                    "Hong Kong",
                    "Hungary",
                    "Iceland",
                    "India",
                    "Indonesia",
                    "Iran (Islamic Republic of)",
                    "Iraq",
                    "Ireland",
                    "Isle of Man",
                    "Israel",
                    "Italy",
                    "Jamaica",
                    "Japan",
                    "Jersey",
                    "Jordan",
                    "Kazakhstan",
                    "Kenya",
                    "Kiribati",
                    "Korea (the Democratic People's Republic of)",
                    "Korea (the Republic of)",
                    "Kuwait",
                    "Kyrgyzstan",
                    "Lao People's Democratic Republic (the)",
                    "Latvia",
                    "Lebanon",
                    "Lesotho",
                    "Liberia",
                    "Libya",
                    "Liechtenstein",
                    "Lithuania",
                    "Luxembourg",
                    "Macao",
                    "Madagascar",
                    "Malawi",
                    "Malaysia",
                    "Maldives",
                    "Mali",
                    "Malta",
                    "Marshall Islands (the)",
                    "Martinique",
                    "Mauritania",
                    "Mauritius",
                    "Mayotte",
                    "Mexico",
                    "Micronesia (Federated States of)",
                    "Moldova (the Republic of)",
                    "Monaco",
                    "Mongolia",
                    "Montenegro",
                    "Montserrat",
                    "Morocco",
                    "Mozambique",
                    "Myanmar",
                    "Namibia",
                    "Nauru",
                    "Nepal",
                    "Netherlands (the)",
                    "New Caledonia",
                    "New Zealand",
                    "Nicaragua",
                    "Niger (the)",
                    "Nigeria",
                    "Niue",
                    "Norfolk Island",
                    "Northern Mariana Islands (the)",
                    "Norway",
                    "Oman",
                    "Pakistan",
                    "Palau",
                    "Palestine, State of",
                    "Panama",
                    "Papua New Guinea",
                    "Paraguay",
                    "Peru",
                    "Philippines (the)",
                    "Pitcairn",
                    "Poland",
                    "Portugal",
                    "Puerto Rico",
                    "Qatar",
                    "Republic of North Macedonia",
                    "Romania",
                    "Russian Federation (the)",
                    "Rwanda",
                    "Réunion",
                    "Saint Barthélemy",
                    "Saint Helena, Ascension and Tristan da Cunha",
                    "Saint Kitts and Nevis",
                    "Saint Lucia",
                    "Saint Martin (French part)",
                    "Saint Pierre and Miquelon",
                    "Saint Vincent and the Grenadines",
                    "Samoa",
                    "San Marino",
                    "Sao Tome and Principe",
                    "Saudi Arabia",
                    "Senegal",
                    "Serbia",
                    "Seychelles",
                    "Sierra Leone",
                    "Singapore",
                    "Sint Maarten (Dutch part)",
                    "Slovakia",
                    "Slovenia",
                    "Solomon Islands",
                    "Somalia",
                    "South Africa",
                    "South Georgia and the South Sandwich Islands",
                    "South Sudan",
                    "Spain",
                    "Sri Lanka",
                    "Sudan (the)",
                    "Suriname",
                    "Svalbard and Jan Mayen",
                    "Sweden",
                    "Switzerland",
                    "Syrian Arab Republic",
                    "Taiwan",
                    "Tajikistan",
                    "Tanzania, United Republic of",
                    "Thailand",
                    "Timor-Leste",
                    "Togo",
                    "Tokelau",
                    "Tonga",
                    "Trinidad and Tobago",
                    "Tunisia",
                    "Turkey",
                    "Turkmenistan",
                    "Turks and Caicos Islands (the)",
                    "Tuvalu",
                    "Uganda",
                    "Ukraine",
                    "United Arab Emirates (the)",
                    "United Kingdom of Great Britain and Northern Ireland (the)",
                    "United States Minor Outlying Islands (the)",
                    "United States of America (the)",
                    "Uruguay",
                    "Uzbekistan",
                    "Vanuatu",
                    "Venezuela (Bolivarian Republic of)",
                    "Viet Nam",
                    "Virgin Islands (British)",
                    "Virgin Islands (U.S.)",
                    "Wallis and Futuna",
                    "Western Sahara",
                    "Yemen",
                    "Zambia",
                    "Zimbabwe",
                    "Åland Islands",
                ],
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
                    this.$store.commit("getData", this.user);
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
