import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "MohammedRizwanMohammedRizwanMohammedRizwan";

class Auth {
  async register(req, res, next) {
    try {
      const { email, firstName, lastName, password } = req.body;

      const userAvailable = await User.findOne({ email });
      if (userAvailable) {
        return res.status(400).json({
          errors: [{ msg: `${email} is already taken`, param: "email" }],
        });
      }
      console.log(req.body);

      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hash = await bcrypt.hash(password, salt);

      const user = await User({
        email,
        password: hash,
        firstName,
        lastName,
      });

      const newUser = await user.save();

      const tokenData = {
        id: newUser._id,
        name: newUser.firstName,
      };
      const token = jwt.sign(tokenData, JWT_SECRET, {
        expiresIn: "3d",
      });

      return res
        .status(201)
        .json({ msg: "Your account has been created ", token });
    } catch (error) {
      next(error);
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
            id: isUser._id,
            name: isUser.firstName,
          };
          const token = jwt.sign(tokenData, JWT_SECRET, {
            expiresIn: "3d",
          });
          if (user.admin) {
            return res.status(201).json({ token, admin: true });
          } else {
            return res.status(201).json({ token, admin: false });
          }
        } else {
          return res
            .status(400)
            .json({
              errors: [{ msg: `Invalid credentials`, param: "password" }],
            });
        }
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${email} is not found`, param: "email" }] });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Auth();
