const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    detail: {
      type: String,
      trim: true,
      required: true,
      min: 50,
    },
    tags: {
      type: Array,
      required: true,
    },
    video: {
      type: String,
      trim: true,
    },
    payment: {
      amount: { type: Number },
      currency: { type: String },
      payPer: { type: String },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    canDoVideoCall: {
      type: Boolean,
      default: true,
    },
    canShareScreen: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // type: String,
      require: true,
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    status: {
      type: String,
      default: "open",
    },
    views: {
      type: Array,
      default: [],
    },
    totalOffers: {
      type: Number,
      default: 0,
    },
    solutionsAttempted: {
      type: Number,
      default: 0,
    },
    languages: {
      type: Array,
      required: true,
    },
    publicCommentsCount: {
      type: Number,
      default: 0,
    },
    publicAnnotatedCommentsCount: {
      type: Number,
      default: 0,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
    voteUsers: {
      type: Array,
      default: [],
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    reportUsers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

questionSchema.virtual("questionBy", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

// tell Mongoose to retreive the virtual fields
questionSchema.set("toObject", { virtuals: true });
questionSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Question", questionSchema);
