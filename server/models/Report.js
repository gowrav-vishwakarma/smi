const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
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
        isquestionReport:{
            type:Boolean,
            default:false
        },
        iscommentReport:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Reports", ReportSchema);
