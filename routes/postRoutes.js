import { Router } from "express";

// controllers
import {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
} from "../controllers/postController.js";
// middleware
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/create_post", auth, createPost);
router.put("/update", auth, updatePost);
router.get("/posts/:id/:page", auth, fetchPosts);
router.get("/post/:id", auth, fetchPost);

export default router;
