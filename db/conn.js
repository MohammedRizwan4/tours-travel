import mongoose from "mongoose";

const connectToMongoDB = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("MongoDB connected");
    })
}

export default connectToMongoDB

