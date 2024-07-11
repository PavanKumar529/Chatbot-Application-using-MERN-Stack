import express from "express"
import { signUpController, signInController } from "../controllers/userController.js"
import multer from "multer"

// Multer configuration for file upload
//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})


// Router level middleware
const userRouter = express.Router()


// Registration || POST
userRouter.post("/sign-up", upload.single('image'), signUpController)

// Login || POST
userRouter.post("/sign-in", signInController)

export default userRouter