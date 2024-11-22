const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        const { _id } = payload;
        User.findById(_id)
            .select("-password") // Exclude password field
            .then(userdata => {
                req.user = userdata;
                next();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Failed to fetch user data" });
            });
    });
};
