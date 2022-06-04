<template>
    <v-card class="mb-12" color="">
        <v-card-title>
            <span class="headline">New Question</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-autocomplete
                    v-model="question.topic"
                    :items=" businessF"
                    label="Topic"
                    required
                    :rules="[(v) => !!v || 'Topic is required']"
                ></v-autocomplete>

                <v-text-field
                    label="Question Title"
                    v-model="question.title"
                    :rules="[
                        (v) => !!v || 'Required',
                        (v) => v.length <= 50 || 'Too long',
                    ]"
                ></v-text-field>
                <v-subheader class="pa-0">Question Detail</v-subheader>
                <vue-editor v-model="question.detail"></vue-editor>
       
                <v-combobox
                    v-model="question.tags"
                    :items="tags"
                    label="Tags"
                    multiple
                    chips
                    clearable
                    :delimiters="[',']"
                    deletable-chips
                ></v-combobox>
                <v-row>
                     <v-col cols="12" sm="6">
                        <v-card>
                            <v-card-title primary-title>
                                How you need the solution
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-checkbox
                                    label="Via chat"
                                    input-value="true"
                                ></v-checkbox>
                                <v-checkbox
                                    label="Via community comments"
                                    input-value="true"
                                ></v-checkbox>
                                <v-checkbox
                                    label="I can share-screen also if needed"
                                    v-model="question.canShareScreen"
                                >
                                </v-checkbox>
                                <v-checkbox
                                    label="Open for Video call if needed"
                                    v-model="question.canDoVideoCall"
                                >
                                </v-checkbox>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="success"
                class="mt-0"
                @click="createQuestion"
                :disabled="!valid"
                block
            >
                Create
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import DataService from "../../services/DataService";

export default {
    data() {
        return {
            blob: null,
            tags: [],
            question: {
                topic: "",
                title: "",
                detail: "",
                tags: [],
                payment: {
                    amount: 0,
                    currency: "",
                    payPer: "",
                },
                isPaid: false,
                canShareScreen: true,
                canDoVideoCall: true,
                authUserId: '',
                userId: '',
                by: 'xyz',
                createdAt: new Date(),
                status: "open",
                totalBids: 0,
                languages: ['hindi','english'],
            },
            valid: false,
            businessF : [
                "Accounting",
                "Advertising",
                "Aerospace",
                "Agriculture",
                "Architecture",
                "Automotive",
                "Banking",
                "Biotechnology",
                "Broadcasting",
                "Business Services",
                "Chemical",
                "Coding",
                "Computer",
                "Construction",
                "Consulting",
                "Designing",
                "Education",
                "Electronics",
                "Energy",
                "Entertainment",
                "Finance",
                "Food & Beverage",
                "Government",
                "Healthcare",
                "Hospitality",
                "Infrastructure Development",
                "Insurance",
                "IT Industry",
                "Machinery",
                "Manufacturing",
                "Media",
                "Not For Profit",
                "Pharmaceutical",
                "Programming",
                "Real Estate",
                "Retail",
                "Shipping",
                "Technology",
                "Telecommunications",
                "Transportation",
                "Utilities",
            ],
        };
    },
    methods: {
       createQuestion() {
            var data = this.question;

            DataService.CreateQuestion(data)
                .then((response) => {
                    console.log(response.data);
                    this.$vToastify.success("Question added");
                })
                .catch((e) => {
                    console.log(e);
                });
        },


    },
};
</script>
