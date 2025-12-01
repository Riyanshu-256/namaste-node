// to create server
const express = require("express");

// To connect database
const connectDB = require("./config/database");

// To connect user model
const User = require("./models/user");

// To connect validation
const { validateSignUpData } = require("./utils/validation");

// importing bcrypt library for hashing passwords
const bcrypt = require("bcrypt");

// import cookies parser
const cookieParser = require("cookie-parser");

// import jwt token
const jwt = require("jsonwebtoken");

// to create application
const app = express();

// Converts incoming JSON data into req.body
app.use(express.json());
// Allows server to read cookies from client (req.cookies)
app.use(cookieParser());

// To connect with userAuth
const {userAuth} = require("./middleware/auth");

// SIGNUP
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

// PROFILE ROUTE (JWT Protected)
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);  
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
});

// send connection request
app.post("/sendConnectionRequest", userAuth, async(req, res) => {

    // Who is sending the connection request
    const user = req.user;
    console.log("Sending a connection request");
    res.send(user.firstName +" " + "sent the connection request ");
})
// CONNECT DB + START SERVER
connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(3000, () => {
            console.log("Server is successfully listening on port 3000...");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected");
    });