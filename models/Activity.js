import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo_url: [
        {
            id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "packages"
    }
}, {
    timestamps: true
})

const Activity = mongoose.model("activitys", activitySchema)

export default Activity