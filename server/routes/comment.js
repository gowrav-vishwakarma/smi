const express = require("express");
const router = express.Router();
const passport = require("passport");

const Comment = require("../models/Comment");
const Question = require("../models/Question");

router.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const commentData = {
            ...req.body,
            commentById: req.user._id,
            commentBy: req.user._id,
        };
        try {
            // console.log("questionData", questionData);
            const newComment = new Comment(commentData);
            const savedComment = await newComment.save();
            // $inc publicCommentsCount in Question by one
            await Question.findByIdAndUpdate(req.body.questionId, {
                $inc: { publicCommentsCount: 1 },
            });

            res.status(200).json(savedComment);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

router.delete("/delC/", async (req, res) => {
    try {
        const { Cd } = req.query;
        await Comment.findByIdAndDelete(Cd);
        return res.status(200).json("Comment has been deleted");
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const { Q_id } = req.query;
        let comment;
        comment = await Comment.find({
            questionId: Q_id,
        }).populate(
            "commentBy",
            "name questionerRatingPoint totalQuestionerRatingCount -_id"
        );
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json(err);
    }
});

//Wishlist-part

module.exports = router;
