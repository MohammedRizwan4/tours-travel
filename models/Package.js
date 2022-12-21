import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startFrom: {
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
    video_url: [
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
    themeId: {
        type: mongoose.mongoose.Schema.Types.ObjectId,
        ref: "themes"
    }
}, {
    timestamps: true
})

const Package = mongoose.model("packages", packageSchema)

export default Package
