const User = require("../model/user");
const { validateEmail } = require("../utills/emailValidator");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Email & Password" });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Valid Email" });
    }

    const findUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "No User With This Email",
      });
    }
    const passwordCheck = await findUser.comparePassword(password);
    if (!passwordCheck) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Password" });
    }
    const token = await findUser.createJWT();

    return res
      .status(200)
      .json({ success: true, message: "User Logged In", token });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
