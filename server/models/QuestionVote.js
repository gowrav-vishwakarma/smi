const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
    {
        questionId: {
            type: String,
            required:true,
        },
        userId: {
            type:String,
            required:true
        },
        isquestionVote:{
            type:Boolean,
            default:false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Votes", VoteSchema);
