import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "packages"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})

const Review = mongoose.model("reviews", reviewSchema)

export default Review
