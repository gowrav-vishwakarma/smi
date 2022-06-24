const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
    {
        questionId: {
            type: String,
            required:true,
        },
        commentId:{
            type:String,
            required:false
        },
        userId: {
            type:String,
            required:true
        },
        isquestionVote:{
            type:Boolean,
            default:false
        },
        iscommentVote:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Votes", VoteSchema);
