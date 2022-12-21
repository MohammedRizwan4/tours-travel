import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required:true
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
},{
    timestamps: true
})


const Theme = mongoose.model("themes", themeSchema)

export default Theme
