const express = require("express");
const router = express.Router();
const passport = require("passport");

const Comment = require("../models/Comment");

router.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const commentData = {
            ...req.body
        };
 try {
            
            // console.log("questionData", questionData);
            const newComment = new Comment(commentData);
            const savedComment = await newComment.save();
            res.status(200).json(savedComment);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

router.delete("/delC/", async (req, res) => {
    try {
        const id = req.query.id;
        await Question.findByIdAndDelete(id);
        return res.status(200).json("User has been deleted");
    } catch (error) {
        return res.status(500).json(err);
    }
});

router.get("/idby", async (req, res) => {
    try {
        let user;
        user = await User.find({
            _id: req.query.id,
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(err);
    }
});

//Wishlist-part

module.exports = router;
