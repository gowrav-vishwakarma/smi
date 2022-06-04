<template>
    <v-card class="mb-12" color="">
        <v-card-title>
            <span class="headline">New Question</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-autocomplete
                    v-model="question.topic"
                    :items="topics"
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
                    <v-col cols="12" sm="6">
                        <v-card>
                            <v-card-title primary-title>
                                Record your issue
                            </v-card-title>
                            <v-divider></v-divider>

                            <v-card-text>
                                Record your issue for better explanation
                                <MulticorderUI
                                    ref="MulticoderUI"
                                    @recorderOndataavailable="
                                        recorderOndataavailable
                                    "
                                    @delete-recording="deleteRecording"
                                />
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
import DataService from "@/services/DataService";
import { topics, languages } from "@/services/staticValues";

import { VueEditor } from "vue2-editor";
import MulticorderUI from "@/components/Multicorder/MulticorderUI.vue";

export default {
    components: {
        VueEditor,
        MulticorderUI,
    },
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
                createdAt: new Date(),
                status: "open",
                totalBids: 0,
                languages: ["hindi", "english"],
            },
            valid: false,
            topics,
            languages,
        };
    },
    methods: {
        deleteRecording(index) {
            if (index === 0) this.blob = null;
        },
        recorderOndataavailable(blob) {
            this.blob = blob;
        },
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
