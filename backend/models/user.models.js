import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default:
      'https://res.cloudinary.com/djvqjvqjv/image/upload/v1688000000/profile/default_profile.jpg',
  },
  cover: {
    type: String,
    default:
      'https://res.cloudinary.com/djvqjvqjv/image/upload/v1688000000/cover/default_cover.jpg',
  },

  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  fowlling: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  about: String,

  work: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const userModel = mongoose.model('User', userSchema)

export default userModel
