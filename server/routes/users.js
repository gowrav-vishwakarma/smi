const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ...
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error(info.message);
                return next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                };
                const token = jwt.sign({ user: body }, "TOP_SECRET");
                user.password = undefined;
                return res.json({ user, token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.delete("/delU/", async (req, res) => {
    try {
        const id = req.query.id;
        await User.findByIdAndDelete(id);
        return res.status(200).json("User has been deleted");
    } catch (error) {
        return res.status(500).json(err);
    }
});

router.put("/editU", async (req, res) => {
    try {
        const {data,id} = req.body;

        console.log(req.body)
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: data,
            },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/", async (req, res) => {
    const top = req.query.top;
    const Language = req.query.language;
    const userID = req.query.user_id;
    try {
        let users;
        if (top) {
            users = await User.find().sort({ totalRatingPoints: -1 }).limit(5);
        } else if (Language) {
            users = await User.find({
                languagesSpeaks: {
                    $in: [Language],
                },
            });
        } else if (userID) {
            users = await User.find({
                userID: userID,
            });
        } else {
            users = await User.find();
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(err);
    }
});

router.get("/idby", async (req, res) => {
    try {
        let user;
        user = await User.find({
            _id: req.query.userId,
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send({message:"No user found"});
    }
});

router.post("/forgot",async (req,res) => {

    const email = req.body.email
    User.findOne({email},(err,user)=>{
        if(err || !user) {
            return res.status(400).json({error:'User with this email does not exist'})
        }

        const token = jwt.sign({_id:user._id},"TOP_SECRET",{expiresIn:'15m'})

        const msg = {
            to:email,
            from:"191352@juitsolan.in",
            subject:"Reset password confirmation",
            text:"Link expires in 15 minutes",
            html:`<div><h3>Please click down the below link to reset your password</h3>
                    <p>${process.env.CLIENT_URL}#/update/${token}</p>
                       </div>`
        };

        return user.updateOne({resetLink:token},(err,user)=>{
            if(err){
                return res.status(400).json({error:"Reset password link error"})
            } else {
                sgMail.send(msg)
                .then(() => {
                    console.log('Email sent')
                  })
                 
                 return res.status(200).json({message:"Email has been sent, please follow the instructions"}) 
            }
        })
    })

});

router.post("/update", async (req,res)=>{
    const {token,password} = req.body;
    if(token){
        jwt.verify(token,"TOP_SECRET",function(error,decodedData){
            if(error) {
                return res.status(400).json({error:"Incorrect token or it is expired"})
            }
            User.findOne({resetLink:token},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({error:"User with this token doesn't exist"})
                }
                user.password = password
                user.save((err,result)=>{
                  if(err){
                      return res.status(400).json({error:"Reset password error"})
                  } else {
                      return res.status(200).json({message:"Your password has been changed"})
                  }
                })
            })
        })
    } else {
        return res.status(401).json({error:"Authentication error"})
    }
})

//Wishlist-part

module.exports = router;
