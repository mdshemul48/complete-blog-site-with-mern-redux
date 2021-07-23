import { Router } from "express"

// controllers 
import { createPost } from "../controllers/postController.js"
// middleware
import auth from "../middlewares/auth.js"

const router = Router()

router.post("/create_post", auth, createPost)

export default router