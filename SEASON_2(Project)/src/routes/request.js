const express = require("express");

const requestRouter = express.Router();

// To connect with userAuth
const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

// send connection request
requestRouter.post("/request/send/status/:toUserId", userAuth, async(req, res) => {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.toUserId;

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        // connectionRequest will save it into DB
        const data = await connectionRequest.save();

        res.json({
            message: "Connection Request Sent Successfully",
            data,
        });

    } catch(err){
        res.status(401).send("ERROR: " + err.message);
    }
    res.send(userAuth.firstName + "Sent the connection request!");
})

module.exports = requestRouter;