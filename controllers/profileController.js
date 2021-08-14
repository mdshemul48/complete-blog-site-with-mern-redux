import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import userModel from "../models/UserModel.js";
import createToken from "../util/token.js";
import UserModel from "../models/UserModel.js";

export const updateName = async (req, res) => {
  const { name, id } = req.body;
  if (name === "") {
    return res.status(400).json({ errors: [{ msg: "Name is required" }] });
  } else {
    try {
      const user = await userModel.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );
      const token = createToken(user);
      return res.status(200).json({ token, msg: "Your name has been updated" });
    } catch (error) {
      return res.status(500).json({ errors });
    }
  }
};

export const updatePasswordValidation = [
  body("currentPassword")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Current password is required."),
  body("userId").not().isEmpty().trim().withMessage("user id not found."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be 6 characters long."),
];

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "user not found." }] });
      }

      const comparedPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!comparedPassword) {
        return res
          .status(400)
          .json({ errors: [{ msg: "current password is wrong" }] });
      }

      // hashing the password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await userModel.findOneAndUpdate(
        { _id: userId },
        { password: hashedPassword },
        { new: true }
      );

      return res.status(200).json({ msg: "your user has been updated." });
    } catch (error) {
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
    // const newpassqwo
  }
};
