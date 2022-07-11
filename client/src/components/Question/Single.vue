<template>
    <v-card elevation="0" class="d-flex mb-2 Qcard">
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
                          Asked  {{ humanized_time_span(question.createdAt) }}
                        </div>
                    <div class="d-flex justify-end">
                       <div><v-icon small>mdi-eye</v-icon> 10 views</div>
                        <v-icon class="ml-1">mdi-send</v-icon>
                    </div>
                    </small>
                </div>
            </div>
            <div class="d-flex justify-space-between mb-0 caption">
                <div>
                    <p @click="goToDetail(question)">{{ shortdetail }}</p>
                </div>
                <div class="mb-0">
                    <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                               color="lighten-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon large>mdi-youtube</v-icon>
                            </v-btn>
                            <p class="text-center mt-1">Media</p>
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
            <v-divider></v-divider>

            <div class="d-flex justify-space-between pl-3 pr-3 mb-2">
                <div class="d-flex flex-column align-center">
                    <div>
                        Tags: 
                        <v-chip
                            label
                            v-for="tag in question.tags"
                            :key="tag"
                            class="mr-1 curve"
                            color="grey lighten-3"
                        >
                            {{ tag }}
                        </v-chip>
                    </div>
                </div>
                <div
                    class="d-flex flex-row justify-space-around align-center mt-1"
                >
                    <v-btn @click="Vote(true)" small v-if="!voted" class="mr-2">
                        <v-icon>mdi-thumb-up</v-icon>{{votes}}
                    </v-btn>
                    <v-btn @click="Vote(false)" small v-if="voted" class="mr-2 primary">
                        <v-icon>mdi-thumb-up</v-icon>{{votes}}
                    </v-btn>
                    <v-btn @click="Report(true)" small v-if="!reported" class="mr-2 text-danger">
                        <v-icon>mdi-thumb-down</v-icon>{{reports}}
                    </v-btn>
                    <v-btn @click="Report(false)" small v-if="reported" class="mr-2 red lighten-1 text-light">
                        <v-icon>mdi-thumb-down</v-icon>{{reports}}
                    </v-btn>
                    <div class="d-flex flex-column mt-3 ml-1">
                    <v-btn class="curve mb-1" @click="goToDetail(question)"
                        >{{ question.publicCommentsCount }} comments</v-btn
                    >
                    <p
                        >{{ question.totalOffers }} Solution offered</p
                    >
                    </div>
                </div>
            </div>
        </v-container>
    </v-card>
</template>

<style>

@import url('https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css? family=Comfortaa&display=swap');

.Qcard {
    min-width: 45rem!important;
    border: 2px solid #D9D9D9!important;
    border-radius: 12px!important;
    margin-top: 10px;
    margin-bottom: 10px;
}
h4,
p {
    font-family: 'Inter';
    cursor: pointer;
}
.curve{
    background-color: #FBFBFB;
    color: #EEEEEE;
    font-size: 10px!important;
    padding: 5px!important;
    line-height: 12.1px;
    border-radius: 12px;
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
            reports:this.question.reportCount,
            reported:false,
            votes:this.question.voteCount
        };
    },
    mounted(){
        this.hasVoted(),
        this.hasReported()
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
        hasReported(){
            
                if(!this.question.reportUsers || this.question.reportUsers.length==0){
                    this.reported = false;
                }
                if(this.question.reportUsers && this.question.reportUsers.includes(this.$store.state.currentUser._id)){
                    this.reported = true;
                } else{
                    this.reported = false;
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
                    if(type==true && this.reported)
                     this.Report(false);
                })
                .catch(err=>console.log(err))
        },

        Report(type){
                DataService.QuestionReport(this.question._id,type)
                .then(response=>{
                    if(response.data.isquestionReport){
                        this.reports =this.reports + 1;
                    } else{
                        this.reports = this.reports - 1;
                    }
                    this.reported = !this.reported;
                    if(type==true && this.voted)
                     this.Vote(false);
                })
                .catch(err=>console.log(err))
               
        }
        
    },
};
</script>
