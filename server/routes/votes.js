const express = require("express");
const router = express.Router();
const passport = require("passport");
const Vote = require("../models/Vote");
const Question = require("../models/Question")
const Comment = require("../models/Comment")


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

            Vote.find({userId:req.user._id,questionId:questionId},async (err,user)=>{
                if(user && user.length > 0){
                    const updatedVote = await Vote.findByIdAndUpdate(
                        user[0]._id.toString(),
                        {
                            $set: VoteData,
                        },
                        { new: true }
                    );
                    // $inc votCount in Question by one
                    if(type==true)
                    {
                    await Question.findByIdAndUpdate(questionId, {
                        $inc: { voteCount: INC },
                        $push: {voteUsers: req.user._id}
                        
                    });
                     } else {
                        await Question.findByIdAndUpdate(questionId, {
                            $inc: { voteCount: INC },
                            $pull: {voteUsers: req.user._id}
                            
                        });
                     }
                    return res.status(200).json(updatedVote);
                } else {
                    const newVote = new Vote(VoteData);
                    const savedVote = await newVote.save();
                    // $inc votCount in Question by one
                    await Question.findByIdAndUpdate(questionId, {
                        $inc: { voteCount: INC },
                        $push: {voteUsers: req.user._id}
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


router.post(
    "/commVote",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const {commentId,questionId,type} = req.body;
        const INC = type==true? 1 : -1;
        console.log(type,INC)
        const VoteData = {
            questionId,
            commentId,
            userId:req.user._id,
            iscommentVote:type
        };
        try {

            Vote.find({userId:req.user._id,commentId:commentId},async (err,user)=>{
                if(user && user.length > 0){
                    const updatedVote = await Vote.findByIdAndUpdate(
                        user[0]._id.toString(),
                        {
                            $set: VoteData,
                        },
                        { new: true }
                    );
                    // $inc votCount in Question by one
                    if(type==true)
                    {
                    await Comment.findByIdAndUpdate(commentId, {
                        $inc: { voteCount: INC },
                        $push: {voteUsers: req.user._id}
                        
                    });
                     } else {
                        await Comment.findByIdAndUpdate(commentId, {
                            $inc: { voteCount: INC },
                            $pull: {voteUsers: req.user._id}
                            
                        });
                     }
                    return res.status(200).json(updatedVote);
                } else {
                    const newVote = new Vote(VoteData);
                    const savedVote = await newVote.save();
                    // $inc votCount in Question by one
                    await Comment.findByIdAndUpdate(commentId, {
                        $inc: { voteCount: INC },
                        $push: {voteUsers: req.user._id}
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



module.exports = router;
