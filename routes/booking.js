import express from "express";
import Booking from "../models/Booking.js";
import PackageModel from "../models/Package.js";

const router = express.Router();

router.post("/package-booking", async (req, res) => {
    try {

        const { state, travellers, id, userId, totalPrice, myParam, adult, children, room, adultPrice, childPrice } = req.body;
        console.log(state, travellers, id, userId, totalPrice, myParam, adult, children, room);
        const singlePackage = await PackageModel.findById(id);
        const startingDate = singlePackage.date;
        const packageName = singlePackage.name;
        console.log(singlePackage.images[0]);

        const travellersArray = travellers.map(traveller => {
            return {
                email: traveller.email,
                gender: traveller.gender,
                name: traveller.name,
                mobile: traveller.mobile,
                type: traveller.type,
                price: traveller.type === "adult" ? adultPrice : childPrice
            }
        })

        console.log(travellersArray);
        const obj = {
            userId,
            user_contact_info: {
                email: state.email,
                name: state.name,
                mobile: state.mobile,
                spMessage: state.spMessage,
            },
            totalPrice,
            travellers: travellersArray,
            packageId: id,
            startingDate,
            packageName,
            duration: myParam,
            adult,
            children,
            room,
            image: singlePackage.images[0]
        }
        console.log(obj);
        const booking = await Booking(obj)
        const saved = await booking.save();
        return res
            .status(201)
            .json({ msg: "Booking done Successfully ", saved });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
})

router.get("/fetch-user-booking/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        // const bookings = await Booking.find({ userId: id });

        const bookings = await Booking.find({ userId: id }).sort({ createdAt: -1 });

        console.log(bookings);
        return res
            .status(200)
            .json({ msg: "Booking done Successfully ", bookings });
    } catch (error) {
        console.log(error);
    }
})


export default router;
