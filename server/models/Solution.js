const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema(
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
        offerId: {
            type: String,
            required: true,
        },
        offerBy: {
            type: String,
            required: true,
        },
        offerById: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Attempted",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Solution", solutionSchema);
