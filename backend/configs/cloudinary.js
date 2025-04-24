import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile',
    allowed_formats: ['jpeg', 'png'],
  },
})

const coverStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'cover',
    allowed_formats: ['jpeg', 'png'],
  },
})

export const profileUpload = multer({ storage: profileStorage })
export const coverUpload = multer({ storage: coverStorage })
