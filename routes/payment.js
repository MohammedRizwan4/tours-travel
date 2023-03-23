import express from "express";
import Booking from "../models/Booking.js";
import PackageModel from "../models/Package.js";
import User from "../models/User.js";
import stripe from "stripe";
import Payment from "../models/Payment.js";
import dotenv from 'dotenv';

dotenv.config();
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.ENDPOINT_SECRET;

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
    const { travellers, userid, bookingId, price, packageId } = req.body;

    const user = await User.findById(userid);
    const email = user.email

    const customer = await stripeInstance.customers.create({
        email,
        metadata: {
            travellers: JSON.stringify({ userid, bookingId, price, packageId })
        }
    })

    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", customer);
    const session = await stripeInstance.checkout.sessions.create({
        billing_address_collection: "required",
        payment_method_types: ['card'],
        line_items: travellers.map((traveller) => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: traveller.name,
                        description: traveller.type === "adult" ? "An Adult travller" : "An children traveller",
                        images: [
                            "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_960_720.png",
                        ]
                    },
                    unit_amount_decimal: traveller.price * 100
                },
                quantity: 1,
            }
        }),
        customer: customer.id,
        mode: 'payment',
        success_url: process.env.SUCCESS_URI,
        cancel_url: process.env.ERROR_URI,
    });

    res.json({ url: session.url });
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        case 'checkout.session.completed':
            const data = event.data.object;
            let customer = await stripeInstance.customers.retrieve(data.customer);
            const customer1 = await stripeInstance.customers.retrieve(customer.id);
            console.log(customer1);
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", customer.metadata.travellers);
            customer = JSON.parse(customer?.metadata?.travellers);
            console.log(customer);

            const payment = await Payment({
                packId: customer.packageId,
                userId: customer.userid,
                address: data.customer_details.address,
                price: customer.price,
                invoice: customer1.invoice_prefix,
                email: customer1.email,
                id: customer1.id
            })

            await payment.save();

            await Booking.updateOne({ _id: customer.bookingId }, { $set: { paymentStatus: 'PAID' } })

            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

router.get('/verify-payment/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const session = await stripeInstance.checkout.sessions.retrieve(id);
        return res.status(200).json({
            msg: "Your payment has been verified sucessfully",
            status: session.payment_status
        })
    } catch (error) {
        return res.status(500).json({ msg: "Server internal error" })
    }
})

export default router;


