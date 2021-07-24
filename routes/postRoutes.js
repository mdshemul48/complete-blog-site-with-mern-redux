import { Router } from "express"

// controllers 
import { createPost, fetchPosts } from "../controllers/postController.js"
// middleware
import auth from "../middlewares/auth.js"

const router = Router()

router.post("/create_post", auth, createPost)
router.get("/posts/:id", auth, fetchPosts)
export default router