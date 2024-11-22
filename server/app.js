const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require('./config/keys');

// Connect to MongoDB
mongoose.connect(MONGOURI).then(() => {
    console.log("connected to mongo yeahh");
}).catch((err) => {
    console.error("error connecting to MongoDB:", err);
});

// MongoDB connection event listeners
mongoose.connection.on('connected', () => {
    console.log("MongoDB connection established");
});
mongoose.connection.on('error', (err) => {
    console.log("MongoDB connection error:", err);
});

// Models
require('./models/user');
require('./models/post');

// Middleware
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    const path = require('path');
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start server
app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});
