import express from 'express'
import isAuthentication from '../middlewares/isAuthentication.js'
import {
  updateUserData,
  userFollow,
  getAuthUser,
  getAllUsers,
  getUserById,
} from '../controllers/user.controller.js'
import upload from '../configs/cloudinary.js'

const userRouter = express.Router()

userRouter.post(
  '/update-user',
  isAuthentication,
  upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  updateUserData
)
userRouter.put('/following/:id', isAuthentication, userFollow)
userRouter.get('/get-auth-user', isAuthentication, getAuthUser)
userRouter.get('/get-all-users', isAuthentication, getAllUsers)

userRouter.get('/get-user/:id', isAuthentication, getUserById)

export default userRouter
