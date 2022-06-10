const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
  questionId: {
      type:String,
      required:true
  },
  description:  {
    type:String,
    required:false
},
  questionById:  {
    type:String,
    required:true
},
userRating:{
    type:Number,
    required:true
},
userBy:  {
  type:String,
  required:true
},
userById:  {
type:String,
required:true
}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
