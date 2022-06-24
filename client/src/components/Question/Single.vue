<template>
    <v-card elevation="0" class="d-flex mb-2 Qcard" shaped tile>
        <v-container>
            <div class="d-flex justify-space-between">
                <div class="d-flex justify-start mb-3" cols="auto">
                    <UserAvatar class="ma-2" :user="question.by" />

                    <div class="d-flex flex-column justify-space-around">
                        <h4 class="mb-2" @click="goToDetail(question)">
                            {{ question.title }}
                        </h4>
                        <h6 class="caption">
                            {{ question.by.name }} |
                            <v-icon class="icon mr-2" small color="green"
                                >mdi-chat</v-icon
                            >
                            <v-icon
                                small
                                v-if="question.canShareScreen"
                                color="green"
                                class="mr-2"
                            >
                                mdi-monitor
                            </v-icon>
                            <v-icon small v-else color="red" class="mr-2">
                                mdi-monitor-off
                            </v-icon>
                            <v-icon
                                small
                                color="green"
                                class="mr-2"
                                v-if="question.canDoVideoCall"
                            >
                                mdi-video
                            </v-icon>
                            <v-icon small color="red" class="mr-2" v-else>
                                mdi-video-off
                            </v-icon>
                        </h6>
                        <div class="caption mt-n1">
                            <v-icon small>mdi-star</v-icon>
                            {{ questionerRating }}
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column justify-start" cols="3">
                    <small class="d-flex flex-column justify-end text-right">
                        <div>
                            {{ humanized_time_span(question.createdAt) }}
                        </div>
                        <div><v-icon small>mdi-eye</v-icon> 10 views</div>
                        <div>
                            {{ question.status }}
                        </div>
                    </small>
                    <div class="d-flex justify-end">
                        <v-icon small>mdi-share</v-icon>
                        <v-icon small class="mt-1">mdi-download</v-icon>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-space-between mb-2 caption">
                <div>
                    <p @click="goToDetail(question)">{{ shortdetail }}</p>
                </div>
                <div>
                    <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="red lighten-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon large>mdi-youtube</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-text>
                                <video
                                    width="100%"
                                    controls
                                    v-if="Video"
                                    :src="Video"
                                ></video>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </div>
            </div>

            <div class="d-flex justify-space-between pl-3 pr-3 mb-2">
                <div class="d-flex flex-column align-center">
                    <div class="">
                        <v-chip
                            label
                            v-for="tag in question.tags"
                            :key="tag"
                            x-small
                            class="mr-1"
                            color="secondary"
                        >
                            {{ tag }}
                        </v-chip>
                    </div>
                </div>
                <div
                    class="d-flex flex-row justify-space-around align-center mt-1"
                >
                    <v-btn @click="Vote(true)" v-if="!voted" x-small class="mr-2">
                        <v-icon x-small>mdi-thumb-up</v-icon>{{votes}} Vote
                    </v-btn>
                    <v-btn @click="Vote(false)" v-if="voted" x-small class="mr-2 primary">
                        <v-icon x-small>mdi-thumb-up</v-icon>{{votes}} Voted
                    </v-btn>
                    <v-btn x-small
                        >{{ question.publicCommentsCount }} people
                        answered</v-btn
                    >
                </div>
            </div>
            <v-divider></v-divider>
        </v-container>
    </v-card>
</template>

<style>
.Qcard {
    width: 100% !important;
}
h4,
p {
    cursor: pointer;
}
</style>

<script>
import S from "string";
import UserAvatar from "@/components/User/Avatar";
import DataService from "@/services/DataService";

export default {
    props: {
        question: Object,
    },
    components: {
        UserAvatar,
    },
    data() {
        return {
            Video: this.question.video,
            dialog: false,
            voted:false,
            votes:this.question.voteCount
        };
    },
    mounted(){
        this.hasVoted()
    },
    computed: {
        questionerRating() {
            return this.question.by.totalQuestionerRatingCount
                ? this.question.by.questionerRatingPoint /
                      this.question.by.totalQuestionerRatingCount
                : "(not-rated)";
        },

        shortdetail() {
            return S(this.question.detail).stripTags().truncate(100).s;
        },
    },
    methods: {
        goToDetail(question) {
            this.$router.push(`/question/${question._id}`);
        },

        hasVoted(){
            
                if(!this.question.voteUsers || this.question.voteUsers.length==0){
                    this.voted = false;
                }
                if(this.question.voteUsers && this.question.voteUsers.includes(this.$store.state.currentUser._id)){
                    this.voted = true;
                } else{
                    this.voted = false;
                }

        },

        Vote(type){
                DataService.QuestionVote(this.question._id,type)
                .then(response=>{

                    if(response.data.isquestionVote){
                        this.votes =this.votes + 1;
                    } else{
                        this.votes = this.votes - 1;
                    }
                    this.voted = !this.voted;
                })
                .catch(err=>console.log(err))
        }
        
    },
};
</script>
