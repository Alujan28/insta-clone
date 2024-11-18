const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId, // Refers to the `_id` of the User model
        ref: "User" // Name of the model you're referencing
    }
});

mongoose.model("Post", postSchema);
