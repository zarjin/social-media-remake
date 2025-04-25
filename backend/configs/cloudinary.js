import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const folderMap = {
      profile: 'profiles',
      cover: 'covers',
    }

    return {
      folder: folderMap[file.fieldname],
      allowed_formats: ['jpeg', 'png', 'jpg'],
    }
  },
})

const upload = multer({ storage })

export default upload
