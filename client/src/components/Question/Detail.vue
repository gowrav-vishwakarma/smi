<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="12" sm="12">
                <v-card class="pa-2" outlined tile>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-card class="pa-2" outlined tile>
                                <h3>
                                    {{ question.title }}
                                </h3>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <vue-editor
                                disabled
                                v-model="questiondetail"
                                :editorOptions="editorOptions"
                            ></vue-editor>
                        </v-col>
                        <v-col cols="8">
                            <video
                                controls
                                width="100%"
                                v-if="question.video"
                                :src="question.video"
                            ></video>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-btn
                                class="tag"
                                v-for="tag in question.tags"
                                :key="tag"
                            >
                                {{ tag }}
                            </v-btn>
                        </v-col>

                        <v-spacer></v-spacer>

                        <v-col>
                            <v-icon small>mdi-circle</v-icon>
                            {{ questionerRating }} {{ question.by.name }} -
                            <br />
                            <span class="language">
                                [ {{ question.languages.join(", ") }} ] -
                                {{ humanized_time_span(question.createdAt) }}
                            </span>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
    name: "QuestionDetail",
    components: {
        VueEditor,
    },
    props: {
        question: Object,
    },
    data() {
        return {
            editorOptions: {
                modules: {
                    toolbar: false,
                },
            },
        };
    },
    computed: {
        questiondetail() {
            return this.question.detail;
        },
        questionerRating() {
            return this.question.by.totalQuestionerRatingCount
                ? this.question.by.questionerRatingPoint /
                      this.question.by.totalQuestionerRatingCount
                : "(New)";
        },
    },
};
</script>

<style scoped>
h3:hover {
    cursor: pointer;
}
.desc {
    max-height: 3.5rem !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.language {
    font-size: 0.8rem;
}
.icon {
    color: rgb(81, 128, 11) !important;
    margin: 0 0.2rem;
}
.btn {
    width: 100%;
}
.tag {
    border-radius: 15px;
    width: auto !important;
    max-height: 1rem !important;
    background-color: orange !important;
    margin: 0rem 0.3rem;
    padding: 0rem !important;
    font-size: 0.6rem !important;
}
</style>
