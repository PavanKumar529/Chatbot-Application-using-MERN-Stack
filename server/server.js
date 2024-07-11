import express from "express"
import dotenv from "dotenv"
// import { config } from "dotenv"
import dbConnect from "./db/dbConnect.js"
import userRouter from "./routers/userRouter.js"


// Creating Express App
const app = express()


// middlewares
dotenv.config() // Load environment variables from .env file
// config()
app.use(express.json()) // Add this line to parse JSON bodies


//PORT and hostname
const PORT = process.env.PORT
const hostName = process.env.HOST_NAME

// db connection
dbConnect()

// Routers
app.use("/api/users", userRouter)

// API Demo
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am Server</h1>")
})


//listen method
app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`);
})