import { Router } from "express"

// controllers 
import { createPost } from "../controllers/postController.js"


const router = Router()

router.post("/create_post", createPost)

export default router