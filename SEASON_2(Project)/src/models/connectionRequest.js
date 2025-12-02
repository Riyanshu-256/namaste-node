// This file defines the connection request between two users.
// Importing mongoose to create schema and model.
const mongoose = require("mongoose");

// Creating a schema for connection requests.
// This schema will store who sent the request and who received it.
const connectionRequestSchema = new mongoose.Schema(
  {
    // ID of the user who is sending the connection request.
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // ID of the user who is receiving the connection request.
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // Status of the connection request.
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Creating the model correctly (NO 'new' keyword)
const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

// Exporting the model
module.exports = ConnectionRequest;
