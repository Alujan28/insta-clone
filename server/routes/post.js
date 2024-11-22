const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

// Get all posts
router.get('/allpost', (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        });
});

// Create a new post
router.post('/createpost', requireLogin, async (req, res) => {
    const { title, body, pic } = req.body;

    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all fields" });
    }

    try {
        req.user.password = undefined; // Exclude password from user data
        const post = new Post({
            title,
            body,
            pic, // Use consistent field name
            postedBy: req.user,
        });

        const result = await post.save();
        res.json({ post: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create post" });
    }
});

// Get logged-in user's posts
router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json({ mypost });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
