import mongoose, { Schema } from 'mongoose'

const paymentSchema = new mongoose.Schema({
    packId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    address: {
        type: Map,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    invoice: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    id: {
        type:String,
        required: true
    }
},{
    timestamps: true
})

const Payment = mongoose.model('payment', paymentSchema)

export default Payment;



