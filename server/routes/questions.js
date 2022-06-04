const express = require('express');
const router = express.Router();
const Question = require('../models/Question')

router.post('/create',async (req,res)=>{
    console.log(req.body) 
    const newQuestion = new Question(req.body)
   try {
        const savedQuestion = await newQuestion.save();
        res.status(200).json(savedQuestion);
    } catch (err) {
       console.log(err)
        res.status(500).json(err);
    }
});



router.delete('/delQ/',async (req,res)=>{
    try {
        const id = req.query.id;
        await Question.findByIdAndDelete(id);
        return res.status(200).json("User has been deleted")
    } catch (error) {
        return res.status(500).json(err)
    }
})

router.put('/editQ/',async (req,res)=>{
    try {
        const id = req.query.id;
        const updatedQues = await User.findByIdAndUpdate(
            id,
            {
                $set : req.body,
            },
            { new:true }
        );
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(err);
    }
})

router.get('/',async (req,res)=>{
    const qNew = req.query.new;
    const Language = req.query.language;
    const userID = req.query.user_id;
    try {
        let users;
        if(qNew){
            users = await User.find().sort({createdAt:-1}).limit(5)
        } else if(Language){
            users = await User.find({
              languagesSpeaks :{
                    $in: [Language],
                },
            });
        }else if(userID){
            users = await User.find({
                 userID:userID,
            });
        } 
        else{
            users = await User.find();
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(err);
    }
})

router.get('/idby',async (req,res)=>{
    try {
        let user;
        user = await User.find({
            _id:req.query.id,
       });
       return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(err);
    }
})

//Wishlist-part
       
 
module.exports = router;