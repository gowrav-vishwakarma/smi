const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
  questionId: {
      type:String,
      required:true
  },
  commentById:  {
    type:String,
    required:true
},
  commentBy:  {
    type:String,
    required:true
},
  comment:  {
    type:String,
    required:true
},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
