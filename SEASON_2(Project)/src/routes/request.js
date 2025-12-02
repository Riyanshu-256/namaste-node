const express = require("express");
const requestRouter = express.Router();

// Middleware
const { userAuth } = require("../middleware/auth");

// Models
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


// ---------------------------------------------------------------------
// 📌 SEND CONNECTION REQUEST
// POST → /request/send/:status/:toUserId
// ---------------------------------------------------------------------

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

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({ message: req.user.firstName + "is " + status + " in " + toUserId.firstName, data});

    } catch (err) {
        next(err);
    }
});

module.exports = requestRouter;