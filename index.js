import express from "express";
import connectToMongoDB from "./db/conn.js"
import User from './models/User.js'
import Theme from "./models/theme.js";
import Package from "./models/Package.js";
import Itinerary from "./models/Iteineraray.js";
import DaysPlan from "./models/DaysPlan.js";
import Activity from "./models/Activity.js";
import Stay from "./models/Stay.js";
import Booking from "./models/Booking.js";
import Traveller from "./models/Traveller.js";
import Payment from "./models/Payment.js";
import Review from "./models/Review.js";
import Testimonial from "./models/Testimonial.js";



const app = express();
const PORT = 7800

connectToMongoDB()

app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`);
})

Testimonial.insertMany([
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
    { name: 'Niraj', description: "I am VIP banda" },
]).then(function () {
    console.log("Data inserted")  // Success
}).catch(function (error) {
    console.log(error)      // Failure
});

