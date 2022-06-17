const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        avatar: {
            type: String,
            trim: true,
            required: false,
            // default: "https://i.pravatar.cc/50",
        },
        password: {
            type: String,
            default: "",
        },
        languagesSpeaks: {
            type: Array,
            required: true,
        },
        topic: {
            type: Array,
            required: true,
        },
        onlineStatus: {
            type: String,
            default: "Offline",
        },
        type: {
            type: String,
            default: "Individual",
        },
        solvedQuestionsCount: {
            type: Number,
            default: 0,
        },
        totalRatingPoints: {
            type: Number,
            default: 0,
        },
        totalSolutionsAttempted: {
            type: Number,
            default: 0,
        },
        totalRatingCount: {
            type: Number,
            default: 0,
        },

        totalQuestionerRatingCount: {
            type: Number,
            default: 0,
        },
        questionerRatingPoint: {
            type: Number,
            default: 0,
        },

        publicCommentsCount: {
            type: Number,
            default: 0,
        },
        publicAnnotatedCommentsCount: {
            type: Number,
            default: 0,
        },

        country: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = password == user.password;
    return compare;
};

module.exports = mongoose.model("User", userSchema);
