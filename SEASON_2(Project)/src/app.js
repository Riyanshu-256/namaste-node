// to create server
const express = require("express");

// To connect database
const connectDB = require("./config/database");

// To connect user model
const User = require("./models/user");

// to create application
const app = express();

app.post("/signup", async (req, res) => {

    // Creating a new instance of the User model
    const user = new User({
        firstName: "Riyanshu",
        lastName: "Sharma",
        emailId: "riyanshu062@gmail.com",
        password: "riya@1234"
    });
    try {
        await user.save();
    res.send("User added successfully!!!");
    } catch (err){
        res.send(401).send("Error saving the user:" + err.message);
    }
})


// Firstly call the connectDB(), try to connect to the database
connectDB()
    .then(() => {
        console.log("Database connection established...");
        // If database is connected, then start our server on port 3000
        app.listen(3000, () => {
            console.log("Server is successfully listening on port 3000...");
        });
    })
    .catch((err) => {
        // If database connection fails, show this error message
        console.error("Database cannot be connected")
    });
