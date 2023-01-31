import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "Mynameisjohnmynameisjohn"

class Auth {
    async register(req, res, next) {
        // console.log(req.body);

        try {
            console.log(req.body);
            const { email, firstName, lastName, password } = req.body;

            const salt = await bcrypt.genSalt(10)
            console.log(salt);
            const hash = await bcrypt.hash(password, salt);

            const user = await User({
                email, password: hash, firstName, lastName
            })

            const newUser = await user.save();

            // const { password, ...others } = newUser;

            return res.status(201).json({ newUser })
        } catch (error) {
            next(error)
        }

    }

    async login(req, res, next) {
        // console.log(req.body);

        try {
            const { email, password } = req.body;
            const isUser = await User.findOne({ email });
            if (isUser) {
                const user = bcrypt.compareSync(password, isUser.password);
                if (user) {
                    const tokenData = {
                        id: isUser._id
                    }
                    const token = jwt.sign(tokenData, JWT_SECRET, {
                        expiresIn: '3d'
                    })

                    res.status(200).json({ token, msg: "You logged in to this site" })
                }
                else {
                    return res.status(400).json({ msg: "Invalid credentials" })
                }
            }
            else {
                return res.status(400).json({ msg: "You had not registered to this site" })
            }
        } catch (error) {
            console.log(error);
        }

    }
}

export default new Auth;

