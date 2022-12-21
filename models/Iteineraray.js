import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Array,
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "packages"
    }
}, {
    timestamps: true
})

const Itinerary = mongoose.model("itinerary", itinerarySchema)

export default Itinerary

