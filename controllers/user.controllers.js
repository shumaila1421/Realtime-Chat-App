import User from "../models/user.model.js";

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
  } catch (error) {}
};
