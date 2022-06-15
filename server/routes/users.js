const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

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

router.put("/editU/", async (req, res) => {
    try {
        const id = req.query.id;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const Language = req.query.language;
    const userID = req.query.user_id;
    try {
        let users;
        if (qNew) {
            users = await User.find().sort({ createdAt: -1 }).limit(5);
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
        return res.status(500).json(err);
    }
});

//Wishlist-part

module.exports = router;
