const mongoose = require('mongoose');

// Create user schema => A design plan for how your documents should be stored
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,  // user must give their firstName otherwise mongoose doesn't allow the insertion  in the database
        minLength: 5,
        maxLength: 35
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,   // user must login with emailId
        unique: true,    // emailid must be unique
        lowercase: true,   // convert upper case into lower case
        trim: true,    // To avoid wide spaces
    },
    password: {
        type: String
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        typr: String,
    },
    about: {
        type: String,
        default: "This is the default about of the user"
    },
    skills: {
        type: [String],    // array of skills
    }
},
{
    timestamps: true   // MongoDB will automatically add when the data was created and when it was last updated.
});

// Create a mongoose model so you can store and fetch data from your schema  
const User = mongoose.model("User", userSchema);

module.exports = User;