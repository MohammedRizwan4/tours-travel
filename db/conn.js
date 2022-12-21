import mongoose from "mongoose";

const connectToMongoDB = () => {
    mongoose.connect("mongodb://localhost:27017/hard", () => {
        console.log("MongoDB connected");
    })
}

export default connectToMongoDB