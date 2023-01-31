import express from "express";
import connectToMongoDB from "./db/conn.js"
import authRoutes from './routes/auth.js'
import cors from 'cors';

const app = express();
const PORT = 7800

connectToMongoDB()

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes)
// app.use((err, req, res, next) => {
//     statusCode = err.status || 500;
//     message = err.message || "Server Internal Error";
//     return res.status(statusCode).json({ message });
//     next()
// })

app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`);
})

