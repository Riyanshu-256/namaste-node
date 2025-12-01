// create a express router
const express = require("express");

// create authRouter => This router will handle user auth routes like signup and login
const authRouter = express.Router();

// To connect validation
const { validateSignUpData } = require("../utils/validation");

// To connect user model
const User = require("../models/user");

// importing bcrypt library for hashing passwords
const bcrypt = require("bcrypt");

// import jwt token
const jwt = require("jsonwebtoken");

// SIGNUP
authRouter.post("/signup", async (req, res) => {
    try {
        // VALIDATION OF DATA 
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;

        // ENCRYPT THE PASSWORD
        const passwordHash = await bcrypt.hash(password, 10);

        // Store the data
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User added successfully!!!");
    } catch (err) {
        res.status(401).send("ERROR :" + err.message);
    }
});

// LOGIN
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user){
            throw new Error("Invalid credentials");
        } 

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) throw new Error("Invalid credentials");

        // calls the getJWT() function on the user and gets a new token for that user.
        const token = await user.getJWT();

        // Add the token to cookie
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });
        res.send("Login Successfully!!");

    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
});

// LOGOUT: Remove the token cookie immediately to log the user out
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout successful");
});

module.exports =  authRouter;
