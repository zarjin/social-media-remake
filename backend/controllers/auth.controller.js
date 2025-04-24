import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.models.js'

export const register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    })

    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('token', token, { httpOnly: true, secure: true })

    res.status(201).json({ message: 'Registered successfully' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Registration failed', error: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await userModel.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    const compare = await bcrypt.compare(password, existingUser.password)

    if (!compare) {
      return res.status(409).json({ message: 'Password Invalid' })
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
    })

    res.status(200).json({ message: 'Login Successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: true })
    res.status(200).json({ message: 'Logout successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Logout failed', error: error.message })
  }
}
