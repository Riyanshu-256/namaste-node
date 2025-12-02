const express = require("express");
const requestRouter = express.Router();

// Middleware
const { userAuth } = require("../middleware/auth");

// Models
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


// SEND CONNECTION REQUEST
// POST → /request/send/:status/:toUserId

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res, next) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        if (fromUserId.toString() === toUserId) {
            return next(new Error("You cannot send request to yourself!"));
        }

        const existing = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existing) {
            return res.status(400).json({ message: "Request already exists!" });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: `${req.user.firstName} is interested in ${toUser.firstName}`,
            data,
        });

    } catch (err) {
        next(err);
    }
});


// REVIEW REQUEST (ACCEPT / REJECT)
// Correct Route → POST /request/review/:status/:requestId

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(401).json({ message: "Invalid status" });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        });

        if (!connectionRequest) {
            return res.status(401).json({ message: "Connection request not found" });
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ message: "Connection request " + status, data });

    } catch (err) {
        res.status(401).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;
