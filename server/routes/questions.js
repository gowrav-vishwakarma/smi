const express = require("express");
const router = express.Router();
const passport = require("passport");
const AWS = require("aws-sdk");

const Question = require("../models/Question");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const questionData = {
      ...req.body,
      userId: req.user._id,
      by: req.user._id,
    };
    // capitalise first letter of sentance in req.body.title
    questionData.title =
      questionData.title.charAt(0).toUpperCase() + questionData.title.slice(1);

    questionData.tags = questionData.tags.split(",");
    questionData.languages = questionData.languages.split(",");

    try {
      if (req.files && req.files.video && process.env.AWS_ACCESS_KEY_ID) {
        console.log("req.files", req.files);
        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID, // your AWS access id
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // your AWS access key
          region: process.env.AWS_REGION,
        });

        const params = {
          Bucket: process.env.AWS_BUCKET, // bucket you want to upload to
          Key: `questions/${req.user._id}/smi-${Date.now()}-${
            req.files.video.name + ".webm"
          }`,
          Body: req.files.video.data,
          // ACL: "public-read",
        };
        const data = await s3.upload(params).promise();
        const url = data.Location;
        questionData.video = url;
      }
      // console.log("questionData", questionData);
      const newQuestion = new Question(questionData);
      const savedQuestion = await newQuestion.save();
      res.status(200).json(savedQuestion);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.delete("/delQ/", async (req, res) => {
  try {
    const id = req.query.id;
    await Question.findByIdAndDelete(id);
    return res.status(200).json("User has been deleted");
  } catch (error) {
    return res.status(500).json(err);
  }
});

router.put("/editQ/", async (req, res) => {
  try {
    const id = req.query.id;
    const updatedQues = await User.findByIdAndUpdate(
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

router.get("/user/:userId", async (req, res) => {
  try {
    let questions;
    questions = await Question.find({
      userId: req.params.userId,
    });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get(
  "/",
  passport.authenticate(["jwt", "anonymous"], { session: false }),
  async (req, res) => {
    const { _id: userId } = req.user ? req.user : { _id: null };
    const {
      topics,
      languages,
      tags,
      isPaid,
      page = 1,
      limit = 10,
      sortBy,
      filterBy,
      tagBy,
    } = req.query;

    console.log(
      sortBy,
      filterBy,
      tagBy,
      "these 3 values from filter which are number value"
    );

    try {
      const query = {
        isPaid: isPaid === "true",
      };

      //topics also not working

      // if (topics)
      //     query.topic =
      //         typeof topics === "string" ? topics.split(",") : topics;

      // if (languages)
      //     query.languages =
      //         typeof languages === "string"
      //             ? languages.split(",")
      //             : languages;
      // if (tags)
      //     query.tags = typeof tags === "string" ? tags.split(",") : tags;

      const questions = await Question.aggregate([
        // {
        //     $match: query,
        // },
        {
          $addFields: {
            didIVoted: {
              $ne: [{ $indexOfArray: ["$voteUsers", userId] }, -1],
            },
            didIReported: {
              $ne: [{ $indexOfArray: ["$reportUsers", userId] }, -1],
            },
          },
        },
        {
          $sort: {
            [sortBy]: -1,
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: +limit,
        },
        // lookup user as by to get the user name avatar questionerRatingPoint totalQuestionerRatingCount -_id
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "by",
          },
        },
      ]);

      return res.status(200).json(questions);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const question = await Question.findById(id).populate(
      "by",
      "name questionerRatingPoint totalQuestionerRatingCount -_id"
    );
    return res.status(200).json(question);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
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
