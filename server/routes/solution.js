const express = require("express");
const router = express.Router();
const passport = require("passport");

const Solution = require("../models/Solution");
const Offer = require("../models/Offer");
const Question = require("../models/Question");
const User = require("../models/User");

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { offerId } = req.body;

        try {
            // find solution by offerId and req.user._id first. if exists return its object
            const solution = await Solution.findOne({
                offerId: offerId,
                offerById: req.user._id,
            });

            if (solution) {
                return res.status(200).json(solution);
            }

            const offer = await Offer.findById(offerId);
            const solutionData = {
                questionId: offer.questionId,
                questionById: offer.questionById,
                questionBy: offer.questionBy,
                solutionBy: offer.offerBy,
                solutionById: offer.offerById,
                offerId,
                offerBy: offer.offerBy,
                offerById: offer.offerById,
            };
            const newSolution = new Solution(solutionData);
            const savedSolution = await newSolution.save();

            // $inc solutionsAttempted by one in Question
            await Question.findByIdAndUpdate(offer.questionId, {
                $inc: { solutionsAttempted: 1 },
            });

            // $inc totalSolutionsAttempted by one in offer.offerById
            await User.findByIdAndUpdate(offer.offerById, {
                $inc: { totalSolutionsAttempted: 1 },
            });

            res.status(200).json(savedSolution);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

module.exports = router;
