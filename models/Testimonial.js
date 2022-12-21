import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Testimonial = mongoose.model("testimonials", testimonialSchema)

export default Testimonial

// photo_url: [
//     {
//         id: {
//             type: String,
//             required: true
//         },
//         url: {
//             type: String,
//             required: true
//         }
//     }
// ]