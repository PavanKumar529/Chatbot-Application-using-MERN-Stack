import express from "express"
import dotenv from "dotenv"
import dbConnect from "./db/dbConnect.js"
// import { config } from "dotenv"

// Creating Express App
const app = express()


// middlewares
dotenv.config()
// config()

//PORT and hostname
const PORT = process.env.PORT
const hostName = process.env.HOST_NAME

dbConnect()

// API Demo
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am Server</h1>")
})


//listen method
app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`);
})