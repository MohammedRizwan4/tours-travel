import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true
    },
    adult: {
        type: Number,
        required: true
    },
    child: {
        type: Number,
        required: true
    },
    pick_up_time: {
        type: Date,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    packageId: {
        type: mongoose.mongoose.Schema.Types.ObjectId,
        ref: "packages"
    },
    userId: {
        type: mongoose.mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})

const Booking = mongoose.model("bookings", bookingSchema)

export default Booking
