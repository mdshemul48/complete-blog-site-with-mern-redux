import { body, validationResult } from "express-validator"
import bcrypt from "bcryptjs"

import createToken from "../util/token.js"
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
        return res.status(400).json({ errors: validationError.array() })
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

            const token = createToken(user)

            return res.status(201).json({ msg: "Your account has been created.", token })
        } catch (err) {
            return res.status(500).json({ error: err })
        }



    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

}



export const loginValidator = [
    body("email").not().isEmpty().trim().withMessage("Email is required."),
    body("password").not().isEmpty().withMessage("Password is required.")
]
export const login = async (req, res) => {
    const validationError = validationResult(req)
    if (!validationError.isEmpty()) {
        return res.status(422).json({ errors: validationError.array() })
    }

    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            const comparedPassword = await bcrypt.compare(password, user.password)
            if (comparedPassword) {
                const token = createToken(user)

                return res.status(200).json({ msg: "You have login successfully", token })

            } else {
                return res.status(401).json({ errors: [{ msg: "Password is not correct." }] })
            }

        } else {
            return res.status(404).json({ errors: [{ msg: "Email not found." }] })
        }

    } catch (err) {
        return res.status(500).json({ errors: err })
    }


}