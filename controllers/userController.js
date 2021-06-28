import { validationResult } from "express-validator"

export const register = (req, res) => {
    const { name, email, password } = req.body
    const validationError = validationResult(req)

    if (!validationError.isEmpty()) {
        return res.status(401).json(validationError.array())
    }
}