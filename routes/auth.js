import express from "express";
import Auth from '../controllers/auth.js'
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
// import { verifyUser } from "../services/validate.js";
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

router.post("/register", Auth.register)
router.post("/login", Auth.login)
router.post("/dashboard/adminlogin", Auth.adminLogin)
router.post("/add-user", async (req, res) => {
    try {
        const user = await User(req.body);

        const newUser = await user.save();
        return res
            .status(201)
            .json({ msg: "Your account has been created ", newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
})

router.put("/update-user", async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.id
        if (req.body.password) {
            if (req.body.password === req.body.confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                const filter = { _id: id };
                const update = {
                    $set: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        confirmPassword: req.body.confirmPassword
                    }
                }
                const updatedUser = await User.updateOne(filter, update)
                console.log(updatedUser);
                return res.status(201).json({ msg: "User Updated ", updatedUser })
            }
        }
        else {
            const filter = { _id: id };
            const update = {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                }
            }
            const updatedUser = await User.updateOne(filter, update)
            console.log(updatedUser);
            return res.status(201).json({ msg: "User Updated ", updatedUser })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
})

router.delete("/delete-user", async (req, res) => {
    try {
        const id = req.body.id
        await User.findByIdAndDelete(id);
        return res.status(200).json({ msg: "User Deleted Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
})

router.get("/fetch-one-user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await User.find({ _id: id })
        console.log(user);
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
})

router.get("/get-all-users", async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({ users })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
})

router.post("/like/package", async (req, res) => {
    try {
        const id = req.body.id;
        const packageId = req.body.packId;
        console.log(packageId);
        const first = await User.find({ _id: id });
        console.log(first);
        if(!first[0].likes.includes(packageId)) {
            const user = await User.findOneAndUpdate({ _id: id }, { $push: { likes: packageId } }, { new: true });
            console.log(user);
            const userFind = await User.find({ _id: id });
            console.log(userFind);
            return res.status(200).json({ msg: "Package liked" })
        }
        else{
            return res.status(200).json({ msg: "Package already been liked" })
        }
        console.log(id);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" })
    }
})

router.post("/dislike/package", async (req, res) => {
    try {
        const id = req.body.id;
        const packageId = req.body.packId;
        console.log(packageId);
        console.log(id);
        const user = await User.findOneAndUpdate(
            { _id: id },
            { $pull: { likes: packageId } },
            { new: true }
        );

        if (user.likes.includes(packageId)) {
            return res.status(200).json({ msg: "Package unliked" });
        } else {
            return res.status(200).json({ msg: "Package was not liked before" });
        }

        console.log(user);

    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" })
    }
})

export default router;
