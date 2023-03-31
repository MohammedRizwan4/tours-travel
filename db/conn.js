import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const connectToMongoDB = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("MongoDB connected");
    })
}

export default connectToMongoDB

