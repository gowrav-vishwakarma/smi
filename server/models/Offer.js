const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        questionId: {
            type: String,
            required: true,
        },
        questionById: {
            type: String,
            required: true,
        },
        questionBy: {
            type: String,
            retruired: true,
        },
        description: {
            type: String,
            required: false,
        },
        // userRating: {
        //     type: Number,
        //     required: true,
        // },
        offerBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        offerById: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
