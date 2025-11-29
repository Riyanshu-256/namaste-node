// to create server
const express = require("express");

// To connect database
const connectDB = require("./config/database");

// To connect user model
const User = require("./models/user");

// to create application
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

    // Creating a new instance of the User model
    const user = new User(req.body);
    try {
        await user.save();
    res.send("User added successfully!!!");
    } catch (err){
        res.status (401).send("Error saving the user:" + err.message);
    }
});

// How to find 1 user from the database
app.get("/user", async (req, res) => {

    // Reading emailId from the request body
    const userEmail = req.body.emailId;

    try {
        // Find one users matching the given emailId
        const users = await User.findOne({ emailId: userEmail });
        if (!users){ 
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
        // // Find all users matching the given emailId
        // const users = await User.find({ emailId: userEmail });

        // // If no user found, send 404 error
        // if (users.length === 0) {
        //     res.status(404).send("User not found");
        // } else {
        //     // If user found, send user data
        //     res.send(users);
        // }

    } catch (err) {
        // If any error occurs in try block, send error message
        res.status(401).send("Something went wrong");
    }
});

// Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        // If any error occurs in try block, send error message
        res.status(401).send("Something went wrong");
    }

});

// Delete a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err){
        res.status(401).send("Something went wrong");
    }
});

// Update data of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
            runValidators: true,  // create a custom validation schema
        });
        console.log(user);
        res.send("User updated successfully");
    } catch (err){
        res.status(401).send("UPDATE FAILED:" + err.message);
    }
});

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
