const express = require("express");

const requestRouter = express.Router();

// To connect with userAuth
const {userAuth} = require("../middleware/auth");

// send connection request
requestRouter.post("/sendConnectionRequest", userAuth, async(req, res) => {

    // Who is sending the connection request
    const user = req.user;
    console.log("Sending a connection request");
    res.send(user.firstName +" " + "sent the connection request ");
})

module.exports = requestRouter;