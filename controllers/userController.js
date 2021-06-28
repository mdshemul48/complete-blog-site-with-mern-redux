import { body, validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


import UserModel from "../models/UserModel.js"


export const registerValidator = [
    body("name").not().isEmpty().trim().withMessage("Name is required."),
    body("email").not().isEmpty().trim().withMessage("Email is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long.")
]
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

        // hashing the password 
        const hashedPassword = await bcrypt.hash(password, 10)

        // storing the user to the db
        try {
            const user = await UserModel.create({ name, email, password: hashedPassword })

            const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "7d" })


            return res.status(201).json({ msg: "Your account has been created.", token })
        } catch (err) {
            return res.status(500).json({ error: err })
        }



    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }

}



export const loginValidator = [
    body("email").not().isEmpty().trim().withMessage("Email is required."),
    body("password").not().isEmpty().withMessage("Password is required.")
]
export const login = (req, res) => {

}