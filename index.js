import express from "express";
import connectToMongoDB from "./db/conn.js"
import authRoutes from './routes/auth.js'
import themeRoutes from './routes/theme.js'
import packageRoutes from './routes/package.js'
import bookingRoutes from './routes/booking.js'
import paymentRoutes from './routes/payment.js'
import bodyParser from "body-parser";
import cors from 'cors';
import multer from "multer";
import fs from 'fs'
import path from 'path'
import url, { fileURLToPath } from 'url'
import PackageModel from "./models/Package.js";
import Booking from "./models/Booking.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
connectToMongoDB()

app.post(
    "/api/webhook",
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf.toString();
        },
    })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', authRoutes)
app.use('/api', themeRoutes)
app.use('/api', packageRoutes)
app.use('/api', bookingRoutes)
app.use('/api', paymentRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is started at ${process.env.PORT}`);
})

