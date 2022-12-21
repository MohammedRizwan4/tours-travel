import mongoose from "mongoose";

const travellerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    lname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: Boolean,
        default: "Female"
    },
    identity_proof: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,of:String,
        ref: "users"
    }
}, {
    timestamps: true
})

const Traveller = mongoose.model("travellers", travellerSchema)

export default Traveller
