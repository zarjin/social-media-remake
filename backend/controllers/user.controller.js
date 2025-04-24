import userModel from '../models/user.models.js'

export const updateUserData = async (req, res) => {
  const { about, work } = req.body
  const userId = req.user.id

  try {
    await userModel.findByIdAndUpdate(userId, {
      profile: req.file.path,
      cover: req.file.path,
      about,
      work,
    })
    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Update user failed', error: error.message })
  }
}
