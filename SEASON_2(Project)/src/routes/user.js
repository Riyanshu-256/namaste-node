const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { User } = require('../models/user');
const userRouter = express.Router();

// get all the pending connection request
userRouter.get("/user/request/recieved", userAuth, async (req, res) => {

    try{

        // Get the currently logged-in user's details
        const loggedInUser = req.user;

        // to find connection request
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age"]);

        res.json({
             message: "Data fetched successfully", 
             data: connectionRequest,
            });

    } catch(err) {
        res.statusCode(404).send("ERROR: " + err.message);
    }

});

// show all the connected users - GET /user/connections
userRouter.get("/user/connections", userAuth, async (req, res, next) => {
    const userId = req.user._id;
    try {
        const acceptedRequests = await ConnectionRequest.find({ 
            $or: [
                { fromUserId: userId, status: "accepted" },
                { toUserId: userId, status: "accepted" }
            ]
        }).populate("fromUserId toUserId", "firstName lastName age gender about skills photoUrl");
        // setting up the connections array
        const connections = acceptedRequests.map(request => {
            if (request.fromUserId._id.toString() === userId.toString()) {
                return request.toUserId;
            } else {
                return request.fromUserId;
            }
        });
        // check if no connections found
        if (connections.length === 0) {
            res.status(200);
            res.json({ message: "No connected users found." });
            console.log(`No connected users found for ${req.user.firstName}...`);
            return;
        }
        // sending response
        try {    
            res.status(200);
            res.json({ message: "Connected users fetched successfully", connections });
            console.log(`Connected users for ${req.user.firstName} fetched successfully...`);
        } catch (error) {
            res.status(500);
            res.json({ message: "Error fetching connected users", error: error.message });
            console.error(`Error fetching connected users for ${req.user.firstName}:`, error);
        }
    } catch (error) {
        res.status(500);
        res.json({ message: "Error fetching connected users", error: error.message });
        console.error(`Error fetching connected users for ${req.user.firstName}:`, error);
    }
});



module.exports = userRouter;