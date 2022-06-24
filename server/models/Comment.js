const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        questionId: {
            type: String,
            required: true,
        },
        commentById: {
            type: mongoose.Schema.Types.ObjectId,
            //type: String,
            required: true,
        },
        commentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        voteCount:{
            type:Number,
            default:0
        },
        voteUsers:{
            type: Array,
            default:[]
        }
    },
    { timestamps: true }
);

commentSchema.virtual("by", {
    ref: "User",
    localField: "commentById",
    foreignField: "_id",
    justOne: true,
});

// tell Mongoose to retreive the virtual fields
commentSchema.set("toObject", { virtuals: true });
commentSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Comment", commentSchema);
