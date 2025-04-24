import express from 'express'
import isAuthentication from '../middlewares/isAuthentication.js'
import { updateUserData } from '../controllers/user.controller.js'

import { profileUpload, coverUpload } from '../configs/cloudinary.js'

const userRouter = express.Router()

userRouter.post(
  '/update-user',
  isAuthentication,
  profileUpload.single('profile'),
  coverUpload.single('cover'),
  updateUserData
)

export default userRouter
