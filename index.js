import express from "express";
import connectToMongoDB from "./db/conn.js"
import authRoutes from './routes/auth.js'
import themeRoutes from './routes/theme.js'
import bodyParser from "body-parser";
import cors from 'cors';
import multer from "multer";
import fs from 'fs'
import path from 'path'
import url, { fileURLToPath } from 'url'

const app = express();
const PORT = 7800

connectToMongoDB()
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', authRoutes)
app.use('/api', themeRoutes)
// app.use((err, req, res, next) => {
//     statusCode = err.status || 500;
//     message = err.message || "Server Internal Error";
//     return res.status(statusCode).json({ message });
//     next()
// })

app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`);
})

