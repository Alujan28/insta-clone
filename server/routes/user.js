const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");
const User = mongoose.model("User");

// Get user profile and posts
router.get('/user/:id', requireLogin, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const posts = await Post.find({ postedBy: req.params.id }).populate("postedBy", "_id name");
        res.json({ user, posts });
    } catch (err) {
        res.status(422).json({ error: "Something went wrong" });
    }
});

// Follow a user
router.put('/follow', requireLogin, async (req, res) => {
    try {
        const followedUser = await User.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        );

        if (!followedUser) {
            return res.status(422).json({ error: "User not found" });
        }

        const currentUser = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        ).select("-password");

        res.json(currentUser);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// Unfollow a user
router.put('/unfollow', requireLogin, async (req, res) => {
    try {
        const unfollowedUser = await User.findByIdAndUpdate(
            req.body.unfollowId,
            { $pull: { followers: req.user._id } },
            { new: true }
        );

        if (!unfollowedUser) {
            return res.status(422).json({ error: "User not found" });
        }

        const currentUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.body.unfollowId } },
            { new: true }
        ).select("-password");

        res.json(currentUser);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// Update profile picture
router.put('/updatepic', requireLogin, async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { pic: req.body.pic } },
            { new: true }
        );
        if (!result) {
            return res.status(422).json({ error: "Could not update profile picture" });
        }
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// Search for users
router.post('/search-users', async (req, res) => {
    try {
        const userPattern = new RegExp("^" + req.body.query, "i");
        const users = await User.find({ email: { $regex: userPattern } }).select("_id email");
        res.json({ users });
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: "Something went wrong" });
    }
});

module.exports = router;
