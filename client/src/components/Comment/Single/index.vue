<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card class="pa-2" outlined tile>
                    <v-row>
                        <v-col cols="12">
                            <p>{{ shortdetail }}</p>
                        </v-col>
                        <!-- Delete/like -->
                        <v-col md="8">
                            <v-btn
                                small
                                class="red"
                                @click="DeleteAns(answer._id)"
                                v-if="isMyCommunityAnswer(answer)"
                            >
                                <v-icon small>mdi-delete</v-icon
                                >
                            </v-btn>

                               <v-btn @click="Vote(true)" v-if="!voted" x-small class="ml-2">
                        <v-icon x-small>mdi-thumb-up</v-icon>{{votes}} Vote
                    </v-btn>
                    <v-btn @click="Vote(false)" v-if="voted" x-small class="ml-2 primary">
                        <v-icon x-small>mdi-thumb-up</v-icon>{{votes}} Voted
                    </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <!-- info -->
                        <v-col md="4">
                            <small>
                                <v-icon small>mdi-circle</v-icon>
                                <span>
                                    <!-- {{ answer.commentBy.totalRatingPoints }}
                                    {{ answer.commentBy.name }} <br /> -->
                                    {{ humanized_time_span(answer.createdAt) }}
                                </span>
                            </small>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import DataService from "@/services/DataService";
import S from "string";
export default {
    data() {
        return {
            userID: this.$store.state.currentUser || null,
            voted:false,
            votes:this.answer.voteCount
        };
    },
    mounted(){
        this.hasVoted();
    },
    computed: {
        shortdetail() {
            return S(this.answer.comment).stripTags().truncate(100).s;
        },
        commenterRating() {
            return this.answer.commentBy.totalQuestionerRatingCount
                ? this.answer.commentBy.questionerRatingPoint /
                      this.answer.commentBy.totalQuestionerRatingCount
                : "(New)";
        },
    },
    props: {
        answer: Object,
    },
    methods: {
        DeleteAns(C_id) {
            DataService.DelCommunityAns(C_id)
                .then((response) => {
                    console.log(response.data);
                    this.$vToastify.success("Comment deleted");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
         hasVoted(){
            
                if(!this.answer.voteUsers || this.answer.voteUsers.length==0){
                    this.voted = false;
                }
                if(this.answer.voteUsers && this.answer.voteUsers.includes(this.$store.state.currentUser._id)){
                    this.voted = true;
                } else{
                    this.voted = false;
                }

        },

        Vote(type){
                DataService.CommentVote(this.answer._id,this.answer.questionId,type)
                .then(response=>{

                    if(response.data.iscommentVote){
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
