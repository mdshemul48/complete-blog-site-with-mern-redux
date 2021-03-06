import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  updateName,
  updatePassword,
  updatePasswordValidation,
} from "../controllers/profileController.js";

const router = Router();

router.post("/updateName", auth, updateName);
router.post(
  "/updatePassword",
  [auth, updatePasswordValidation],
  updatePassword
);

export default router;
