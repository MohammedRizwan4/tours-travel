import mongoose from 'mongoose'

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
        state: {
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
    starts: {
        type: Number,
        default: 5
    },
    accommodations: [
        {
            type: String,
            default: "Hotels"
        }
    ]
})

const PackageModel = mongoose.model('package', packageSchema)

export default PackageModel;



