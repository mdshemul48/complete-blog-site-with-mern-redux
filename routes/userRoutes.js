import { Router } from "express";

// controllers
import {
  register,
  login,
  registerValidator,
  loginValidator,
} from "../controllers/userController.js";

// validators

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
export default router;
