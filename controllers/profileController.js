import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import createToken from "../util/token.js";
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
    } catch (error) {
      return res.status(500).json({ errors });
    }
  }
};
