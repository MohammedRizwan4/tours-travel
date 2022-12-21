import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})

const Payment = mongoose.model("payments", paymentSchema)

export default Payment