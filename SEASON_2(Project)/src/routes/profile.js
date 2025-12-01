// create a express router
const express = require("express");

// create a profileRouter which ih handle user profile like view, edit, password
const profileRouter = express.Router();

// To connect with userAuth
const {userAuth} = require("../middleware/auth");

// PROFILE ROUTE (JWT Protected)
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;  
        res.send(user);  
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter;