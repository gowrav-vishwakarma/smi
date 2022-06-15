<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="12" sm="12">
                <v-card class="pa-2" outlined tile>
                    <v-row>
                        <v-col cols="12" md="12">
                            <h3 class="heading-6">
                                {{ question.title }}
                            </h3>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="caption" v-html="questiondetail"></div>
                            <!-- <vue-editor
                                disabled
                                v-model="questiondetail"
                                :editorOptions="editorOptions"
                                class="caption"
                            ></vue-editor> -->
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

                        <v-col class="caption">
                            <router-link :to="`/userprofile/${question.userId}`">
                            <v-icon small>mdi-circle</v-icon>
                            {{ questionerRating }} {{ question.by.name }} -
                            <br />
                            <span class="language caption">
                                [ {{ question.languages.join(", ") }} ] -
                                {{ humanized_time_span(question.createdAt) }}
                            </span>
                            </router-link>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// import { VueEditor } from "vue2-editor";

export default {
    name: "QuestionDetail",
    components: {
        // VueEditor,
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
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";

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
