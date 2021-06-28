import { body } from "express-validator"

export const registerValidator = [
    body("name").not().isEmpty().trim().withMessage("Name is required."),
    body("email").not().isEmpty().trim().withMessage("Email is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long.")
]