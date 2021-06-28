import { validationResult } from "express-validator"

import UserModel from "../models/UserModel.js"


export const register = async (req, res) => {
    const { name, email, password } = req.body
    const validationError = validationResult(req)

    if (!validationError.isEmpty()) {
        return res.status(401).json(validationError.array())
    }


    try {
        const checkUser = await UserModel.findOne({ email })
        if (checkUser) {
            return res.status(403).json({ error: [{ msg: "Email is already taken." }] })
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }

}