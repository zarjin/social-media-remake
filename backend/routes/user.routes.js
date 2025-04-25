import express from "express";
import isAuthentication from "../middlewares/isAuthentication.js";
import {
  updateUserData,
  userFollower,
  userFowling,
  getUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import upload from "../configs/cloudinary.js"; // Single upload middleware

const userRouter = express.Router();

userRouter.post(
  "/update-user",
  isAuthentication,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateUserData
);
userRouter.put("/following/:id", isAuthentication, userFowling);
userRouter.put("/follower/:id", isAuthentication, userFollower);
userRouter.get("/get-user", isAuthentication, getUser);
userRouter.get("/get-all-users", isAuthentication, getAllUsers);

export default userRouter;
