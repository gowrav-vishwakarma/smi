<template>
    <div class="pr-2 pl-2">
        <v-row dense>
            <v-col cols="12" md="1" class="pa-1 text-end">
                <v-row no-gutters>
                    <v-col class="grey--text text-lighten-3 caption">
                        {{ question.totalOffers }}
                        {{ question.totalOffers == 1 ? "Offer" : "Offers" }}
                    </v-col>
                    <v-col class="grey--text text-lighten-3 caption">
                        {{ question.publicCommentsCount }}
                        {{
                            question.publicCommentsCount == 1
                                ? "Comment"
                                : "Comments"
                        }}
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col col="12">
                        <v-icon class="icon" small color="green"
                            >mdi-chat</v-icon
                        >
                        <v-icon
                            small
                            v-if="question.canShareScreen"
                            color="green"
                        >
                            mdi-monitor
                        </v-icon>
                        <v-icon small v-else color="red">
                            mdi-monitor-off
                        </v-icon>
                        <v-icon
                            small
                            color="green"
                            v-if="question.canDoVideoCall"
                        >
                            mdi-video
                        </v-icon>
                        <v-icon small color="red" v-else>
                            mdi-video-off
                        </v-icon>
                        <v-icon class="icon" v-if="question.isPaid" medium
                            >mdi-cash</v-icon
                        >
                    </v-col>
                </v-row>
            </v-col>
            <v-divider inset vertical class=""></v-divider>
            <v-col cols="12" md="10">
                <div
                    @click="goToDetail(question)"
                    class="pl-2 mb-2 text-subtitle-2"
                    style="cursor: pointer"
                >
                    {{ question.title }}
                </div>

                <div class="pl-2 caption mb-5" @click="goToDetail(question)">
                    {{ shortdetail }}
                </div>
                <v-spacer></v-spacer>
                <video width="100%" v-if="Video" :src="Video"></video>

                <v-row>
                    <v-col>
                        <v-chip
                            label
                            v-for="tag in question.tags"
                            :key="tag"
                            small
                            color="indigo"
                            dark
                            class="ml-1 mr-1"
                        >
                            {{ tag }}
                        </v-chip>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col class="grey--text caption text--darken-2">
                        <router-link :to="`/userprofile/${question.userId}`">
                        <v-icon small>mdi-circle</v-icon>
                        {{ questionerRating }} {{ question.by.name }} <br />
                        <span class="language">
                            [ {{ question.languages.join(", ") }} ] -
                            {{ humanized_time_span(question.createdAt) }}
                        </span>
                        </router-link>
                    </v-col>
                </v-row>
                <v-divider class="mb-1"></v-divider>
            </v-col>
        </v-row>
    </div>
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
    font-size: 0.75rem;
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
