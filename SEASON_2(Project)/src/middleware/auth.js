// it verifies the JWT token, fetches the user from the database, and attaches the user to req.user so that only logged-in users can access protected routes.

// Importing JWT package to verify tokens
const jwt = require("jsonwebtoken");

// Importing User model to fetch user data from database
const User = require("../models/user");

// Middleware function to authenticate user
const userAuth = async (req, res, next) => {
    try {
        // Extracting token from cookies or Authorization header
        let token = req.cookies?.token;
        
        // If token is not in cookies, try to get it from Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7); // Remove "Bearer " prefix
            }
        }

        // If token is not valid
        if(!token){
            throw new Error("Token is not valid");
        }

        // Verifying the token using secret key
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

        // Extracting user ID from decoded token
        const { _id } = decodedObj;

        // Finding the user in the database
        const user = await User.findById(_id);

        // If user does not exist, throw an error
        if (!user) {
            throw new Error("User not found");
        }

        // Attaching found user to request object
        req.user = user;

        // Passing control to next middleware
        next();
    }
    catch (err) {
        // Sending error message if anything fails
        res.status(401 ).send("ERROR: " + err.message);
    }
};

// Exporting the middleware to use in other files
module.exports = {
    userAuth,
};