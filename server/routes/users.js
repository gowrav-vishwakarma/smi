const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var bcrypt = require("bcrypt");
const router = express.Router();
const User = require('../models/User')

router.post('/register',async (req,res)=>{
    console.log(req.body) 
    const newUser = new User(req.body)
   try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
       console.log(err)
        res.status(500).json(err);
    }
});

router.post('/login',async (req,res)=>{
  console.log(req.body) 
  User.findOne({
    email: req.body.email
  })
  .exec((err, user) => {
    if (err) {
      res.status(500)
        .send({
          message: err
        });
      return;
    }
    if (!user) {
      return res.status(404)
        .send({
          message: "User Not found."
        });
    }

    var passwordIsValid = (req.body.password === user.password) ? true : false;
    
    if (!passwordIsValid) {
      return res.status(401)
        .send({
          message: "Invalid Password!"
        });
    }
    
    res.status(200)
      .send({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.name,
        },
        message: "Login successfull"
      });
  });
});


router.delete('/delU/',async (req,res)=>{
    try {
        const id = req.query.id;
        await User.findByIdAndDelete(id);
        return res.status(200).json("User has been deleted")
    } catch (error) {
        return res.status(500).json(err)
    }
})

router.put('/editU/',async (req,res)=>{
    try {
        const id = req.query.id;
        const updatedUser = await User.findByIdAndUpdate(
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