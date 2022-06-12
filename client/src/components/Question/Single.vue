<template>
    <v-container class="grey lighten-5">
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-row>
                        <v-col cols="12" md="12">
                            <h3 @click="goToDetail(question)">
                                {{ question.title }}
                            </h3>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="10">
                            <p
                                class="pa-2 desc"
                                outlined
                                tile
                                @click="goToDetail(question)"
                            >
                                {{ shortdetail }}
                            </p>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2">
                            <video
                                width="100%"
                                v-if="Video"
                                :src="Video"
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
                            {{ questionerRating }} {{ question.by.name }} <br />
                            <span class="language">
                                [ {{ question.languages.join(", ") }} ] -
                                {{ humanized_time_span(question.createdAt) }}
                            </span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col col="12">
                            <v-card class="pa-2">
                                <v-icon class="icon" small>mdi-chat</v-icon>
                                <v-icon
                                    class="icon"
                                    v-if="question.canDoVideoCall"
                                    small
                                    >mdi-video</v-icon
                                >
                                <v-icon
                                    class="icon"
                                    v-if="question.canShareScreen"
                                    small
                                    >mdi-monitor</v-icon
                                >
                                <v-icon
                                    class="icon"
                                    v-if="!question.isPaid"
                                    medium
                                    >mdi-cash</v-icon
                                >
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
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
    font-size: 0.6rem;
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
<script>
import S from "string";
export default {
    props: {
        question: Object,
    },
    data() {
        return {
            Video: this.question.video,
        };
    },
    computed: {
        questionerRating() {
            return this.question.by.totalQuestionerRatingCount
                ? this.question.by.questionerRatingPoint /
                      this.question.by.totalQuestionerRatingCount
                : "(New)";
        },

        shortdetail() {
            return S(this.question.detail).stripTags().truncate(100).s;
        },
    },
    methods: {
        goToDetail(question) {
            this.$router.push(`/question/${question._id}`);
        },
    },
};
</script>
