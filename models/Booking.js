import mongoose, { Schema } from 'mongoose'

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    user_contact_info: {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        spMessage: {
            type: String,
            required: true,
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    travellers: [{
        email: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    packageId: {
        type: String,
        required: true
    },
    startingDate: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true,
        default: "PENDING"
    },
    packageName: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    adult: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Booking = mongoose.model('booking', bookingSchema)

export default Booking;



