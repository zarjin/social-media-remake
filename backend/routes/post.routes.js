import express from "express";
import isAuthentication from "../middlewares/isAuthentication.js";
import {
  createPost,
  likePost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  getTimelinePosts,
} from "../controllers/post.controller.js";
import postUpload from "../configs/cloudinary.js";
const postRouter = express.Router();

postRouter.post(
  "/create-post",
  isAuthentication,
  postUpload.single("img"),
  createPost
);
postRouter.put("/like-post/:id", isAuthentication, likePost);
postRouter.put(
  "/update-post/:id",
  isAuthentication,
  postUpload.single("img"),
  updatePost
);

postRouter.delete("/delete-post/:id", isAuthentication, deletePost);
postRouter.get("/get-post/:id", isAuthentication, getPost);
postRouter.get("/get-all-posts", isAuthentication, getAllPosts);
postRouter.get("/get-timeline-posts", isAuthentication, getTimelinePosts);

export default postRouter;
