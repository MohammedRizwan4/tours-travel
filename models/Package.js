import mongoose, { Schema } from 'mongoose'

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    location: {
        city: {
            type: String,
            required: true,
            default: ""
        },
        state_name: {
            type: String,
            required: true,
            default: ""
        }
    },
    destinations_covered: [
        {
            type: String,
            default: "Hotels"
        }
    ],
    starting_point: {
        type: String,
        required: true
    },
    ending_point: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        default: 5
    },
    date: {
        type: String,
        required: true
    },
    details: [{
        price: {
            type: Number,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        transfer_price: {
            type: Number,
            required: true
        },
        accommodations: [{
            name: {
                type: String,
                required: true
            },
            nearby: {
                type: String,
                required: true
            },
            images: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            stars: {
                type: Number,
                required: true
            },
            acc_type: {
                type: String,
                default: "HOTEL"
            }
        }],
        flights: [{
            airport: {
                type: String,
                required: true,
            },
            destination_airport: {
                type: String,
                required: true
            },
            flightno: {
                type: String,
                default: "G8-286"
            },
            startTime: {
                type: String,
                required: true,
                default: "10:30"
            },
            endTime: {
                type: String,
                required: true,
                default: "13:50"
            }
        }]
    }],

    theme_id: {
        type: String,
    }
},{
    timestamps: true
})

const PackageModel = mongoose.model('package', packageSchema)

export default PackageModel;



