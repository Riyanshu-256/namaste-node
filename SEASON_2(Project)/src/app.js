// to create server
const express = require("express");

// To connect database
const connectDB = require("./config/database");

// To connect user model
const User = require("./models/user");

// To connect validation
const {validateSignUpData} = require("./utils/validation");

// importing bcrypt library for hashing passwords
const bcrypt = require("bcrypt");

// to create application
const app = express();

app.use(express.json());

// SIGNUP
app.post("/signup", async (req, res) => {

    try {
    // VALIDATION OF DATA 
    validateSignUpData(req);
    const {firstName, lastName, emailId, password} = req.body;

    // ENCRYPT THE PASSWORD
    const passwordHash = await bcrypt.hash(password, 10);  // hashing(to encypt your password, bcrypt uses hash) the password with 10 salt rounds
    console.log(passwordHash);

    // To store the data => Creating a new instance of the User model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
    
        await user.save();
    res.send("User added successfully!!!");
    } catch (err){
        res.status (401).send("ERROR :" + err.message);
    }
});

// LOGIN
    app.post("/login", async (req, res) => {
    try {
        // extract the emailId and password from the request body
        const { emailId, password } = req.body;

        // Make sure that 'emailId' matches the field name in your DB
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        // We used bacrypt library to compare the emailId and password is correct or not
        // Compare input password with hashed password stored in DB
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.send("Login Successfully!!");
        } else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }});


// How to find 1 user from the database
app.get("/user", async (req, res) => {

    // Reading emailId from the request body
    const userEmail = req.body.emailId;

    try {
        // Find one users matching the given emailId
        const users = await User.findOne({ emailId: userEmail });
        if (!users){ 
            res.status(401).send("User not found");
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
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["about", "gender", "age", "skills", "password"];

        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10) {
            throw new Error("Skills can't be more than 10")
        }

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
