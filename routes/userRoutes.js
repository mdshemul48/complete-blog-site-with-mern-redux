import { Router } from "express";

// controllers 
import { register } from "../controllers/userController.js";

// validators
import { registerValidator } from "../middleware/registerMiddleware.js";

const router = Router()


router.post("/register", registerValidator, register)

export default router
