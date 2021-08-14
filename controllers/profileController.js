import userModel from "../models/UserModel.js";
import createToken from "../util/token.js";
import { body, validationResult } from "express-validator";

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
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be 6 characters long."),
];

export const updatePassword = async (req, res) => {
  const { current, newPassword } = req.body;
};
