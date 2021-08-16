import { Router } from "express";

// controllers
import {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
  updateValidations,
  updateImage,
  deletePost,
  home,
} from "../controllers/postController.js";
// middleware
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/create_post", auth, createPost);
router.post("/updateImage", auth, updateImage);
router.put("/update", [auth, updateValidations], updatePost);
router.get("/posts/:id/:page", auth, fetchPosts);
router.get("/post/:id", auth, fetchPost);
router.delete("/delete/:id", auth, deletePost);
router.get("/home/:page", home);

export default router;
