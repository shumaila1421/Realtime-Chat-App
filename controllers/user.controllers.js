import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (res, user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5y",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 5 * 365 * 24 * 60 * 60 * 1000,
  });
};
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(422).json({ message: "Username is required!" });
    }
    if (!email) {
      return res.status(422).json({ message: "Email is required!" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required!" });
    }
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const userData = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await userData.save();

    generateToken(res, user);
    const { password: pass, ...rest } = user._doc;
    res.json({
      success: true,
      message: "User register successfully!",
      user: rest,
    });
  } catch (error) {}
};
