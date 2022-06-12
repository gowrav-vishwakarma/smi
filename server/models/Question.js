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
            type: String,
            require: true,
        },
        by: {
            type: String,
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
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
