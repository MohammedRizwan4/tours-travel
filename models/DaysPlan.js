import mongoose from "mongoose";

const daysPlanSchema = new mongoose.Schema({
    days_desc: [
        {
            desc: Array,
        }
    ],
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "packages"
    }
}, {
    timestamps: true
})

const DaysPlan = mongoose.model("daysPlans", daysPlanSchema)

export default DaysPlan
