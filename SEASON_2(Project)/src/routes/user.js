const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending connection request
userRouter.get("/user/request", userAuth, async (req, res) => {

    try{

        // Get the currently logged-in user's details
        const loggedInUser = req.user;

        // to find connection request
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
        });
        res.json({
             message: "Data fetched successfully", 
             data: connectionRequest,
            });

    } catch(err) {
        res.statusCode(404).send("ERROR: " + err.message);
    }

});




module.exports = userRouter;