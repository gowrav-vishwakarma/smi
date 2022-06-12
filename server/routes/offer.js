const express = require("express");
const router = express.Router();
const passport = require("passport");

const Offer = require("../models/Offer");
const Question = require("../models/Question");

router.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const offerData = {
            ...req.body,
            offerBy: req.user.name,
            offerById: req.user._id,
        };
        try {
            // console.log("questionData", questionData);
            const newOffer = new Offer(offerData);
            const savedoff = await newOffer.save();
            // $inc totalOffers by one in Question
            await Question.findByIdAndUpdate(req.body.questionId, {
                $inc: { totalOffers: 1 },
            });

            res.status(200).json(savedoff);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

router.delete("/delC/", async (req, res) => {
    try {
        const { O_id } = req.query;
        await Offer.findByIdAndDelete(O_id);
        return res.status(200).json("Offer has been removed");
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const { Q_id } = req.query;
        let offer;
        offer = await Offer.find({
            questionId: Q_id,
        });
        return res.status(200).json(offer);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//Wishlist-part

module.exports = router;
