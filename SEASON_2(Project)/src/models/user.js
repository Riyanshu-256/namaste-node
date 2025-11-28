const mongoose = require('mongoose');

// Create user schema => A design plan for how your documents should be stored
const userSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

// Create a mongoose model so you can store and fetch data from your schema
const User = mongoose.model("User", userSchema);

module.exports = User;