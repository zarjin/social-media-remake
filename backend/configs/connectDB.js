import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default connectDB
