import mongoose from "mongoose";

const connectToMongoDB = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect("mongodb://localhost:27017/packandgo", () => {
        console.log("MongoDB connected");
    })
}

export default connectToMongoDB

