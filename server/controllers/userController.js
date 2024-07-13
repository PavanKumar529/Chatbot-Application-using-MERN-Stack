import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import dotenv from "dotenv"

dotenv.config()

// User registration controller
const signUpController = async(req, res, next) => {
        try {
            const { name, fName, mobile, gender, email, password, confirmPassword} = req.body
            const { filename: image } = req.file;

            // Check if all required fields are present
            if(!name || !fName || !mobile || !gender || !email || !password || !confirmPassword || !image) {
                return res.status(400).send({message: "All fields are required", success: false})
            }
         
            // Check if the email already exists in the database
            const existingUser = await userModel.findOne({email})
            if(existingUser) {
                return res.status(400).send({ message: "User already exists, please login", success: false})
            }

            // Check if passwords match
            if(password !== confirmPassword) {
                return res.status(400).send({ message: "Passwords do not match", success: false });
            }
                        
            // Hash passwords
            // const hashedPassword = await bcrypt.hash(password, 10)
            const hashedPassword = bcrypt.hashSync(password, 10)
            

            // Create new user object
            let newUserData = new userModel({
                ...req.body,
                password: hashedPassword,
                image: req.file.filename
            });
            // // Create new user object
            // const newUser = new userModel({
            //     name,
            //     fName,
            //     mobile,
            //     gender,
            //     email,
            //     password: hashedPassword,
            //     image,
            // });
            
            // Save user to the database
            await newUserData.save()
            res.status(201).send({ message: "Registration successful", success: true });
        }

        catch(error) {
            console.error("Error in signUpController:", error);
            next(error);   // Pass error to the error handling middleware
        }
    
}

const signInController = async(req, res, next) => {
    try {
        const { email, password } = req.body

        // Validate required fields
        if(!email || !password) {
            return res.status(400).send({message: "All fields are required", success: false})
        }

        // Check if the user exists
        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            // Compare password
            var isPasswordValid = bcrypt.compareSync(password, existingUser.password)
            if(isPasswordValid) {
                // const token = jwt.sign(existingUser._id.toString(), process.env.Jwt_Secrete_Key)
                // res.cookie("token", token)
                // const userId = existingUser._id

                // Generate JWT token
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h"})
                // Set cookie with the token
                res.cookie("auth_token", token, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true })
                return res.status(200).send({ message: "User successfully logged in", success: true})
            }
            else {
                return res.status(401).send({message: "Invalid email or password", success: false})
            }
        }        
        else {
            return res.status(401).send({message: "User not found, Please register", success: false})
        }
    }
    catch(error) {
        console.error("Error in signInController:", error);
        next(error);  // Pass error to the error handling middleware
    }
}

let verifyController = async (req, res) => {
    res.json({ ok: "done" });
  };
  

  const getUser = async (req, res) => {
    try {
        const { userId } = req
        const userDetails = await userModel.findById(userId).select("-_id -password -__v")
        if (!userDetails) {
            return res.status(403).send({ error: "User is not available" })
        }
        else return res.status(200).send(userDetails)
    }
    catch (err) {
        res.status(500).send({ error: "something went wrong", errorMsg: err.message })
    }
}


export { signUpController, signInController, verifyController, getUser }