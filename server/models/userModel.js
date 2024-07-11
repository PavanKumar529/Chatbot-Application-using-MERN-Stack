import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        require: true 
    },
    fName: {
        type: String,
        require: true
    },
    lName: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
    },
    // age: {
    //     type: Number
    // },
    dateOfBirth: {
        type: Date,
        // required: true
    },
    mobile: {
        type: String,
        // unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true 
    },
    address: {
        type: {
            location: String,
            landmark: String,
            pin: Number,
            state: String,
            country: String
        }
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    },
    image: {
        type: String,  // Assuming you're storing the path or URL to the uploaded photo
        // require: true
    },
    description: {
        type: String,
        // required: true
    },
    tc: {
        type: Boolean,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


const userModel = mongoose.model("users", userSchema)

export default userModel