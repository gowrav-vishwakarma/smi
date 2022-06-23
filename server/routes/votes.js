const express = require("express");
const router = express.Router();
const passport = require("passport");
const QVote = require("../models/QuestionVote");
const Question = require("../models/Question")


router.post(
    "/quesVote",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const {questionId,type} = req.body;
        const INC = type==true? 1 : -1;
        console.log(type,INC)
        const VoteData = {
            questionId,
            userId:req.user._id,
            isquestionVote:type
        };
        try {

            QVote.find({userId:req.user._id},async (err,user)=>{
                if(user && user.length > 0){
                    const updatedVote = await QVote.findByIdAndUpdate(
                        user[0]._id.toString(),
                        {
                            $set: VoteData,
                        },
                        { new: true }
                    );
                    // $inc votCount in Question by one
                    await Question.findByIdAndUpdate(questionId, {
                        $inc: { voteCount: INC },
                    });
                    return res.status(200).json(updatedVote);
                } else {
                    const newVote = new QVote(VoteData);
                    const savedVote = await newVote.save();
                    // $inc votCount in Question by one
                    await Question.findByIdAndUpdate(questionId, {
                        $inc: { voteCount: INC },
                    });
        
                    res.status(200).json(savedVote);
                } 
            })
          
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

router.get("/question", async (req, res) => {
    try {
        const { questionId,userId } = req.query;
        let vote;
        vote = await QVote.find({
            questionId: questionId,
            userId: userId
          })
          return res.json(vote);
    } catch (error) {
        return res.status(500).json(err);
    }
});

// router.get("/comment", async (req, res) => {
//     try {
//         const { commentId,userId } = req.query;
//         let vote;
//         vote = await Vote.find({
//             commentId: commentId,
//             userId: userId
//           })
//           return res.json({ vote });
//     } catch (error) {
//         return res.status(500).json(err);
//     }
// });


module.exports = router;
