import jwt from "jsonwebtoken";

const token = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "7d" });

export default token;
