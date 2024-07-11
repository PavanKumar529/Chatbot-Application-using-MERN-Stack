import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const url =  `${process.env.MONGO_DB_URL}/${process.env.DB_NAME}`

const dbConnect = async() => {
    try {
        await mongoose.connect(url)
        console.log("Database is connected");
    }
    catch(error) {
        console.log(error.message);
    }
}

export default dbConnect