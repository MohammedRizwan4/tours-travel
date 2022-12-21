import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        default: "9510403920",
        min: 10,
        max: 10
    },
    gender: {
        type: Boolean,
        default: "Female"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    img_details: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
})


const User = mongoose.model("Users", userSchema)

export default User
