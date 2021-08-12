import { Router } from "express";
import auth from "../middlewares/auth.js";
import { updateName } from "../controllers/profileController.js";

const router = Router();

router.post("/updateName", auth, updateName);

export default router;
