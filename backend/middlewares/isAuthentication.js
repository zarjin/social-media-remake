import jwt from 'jsonwebtoken'

const isAuthentication = (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()
  } catch (error) {
    console.error('JWT Verification Error:', error.message)
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}

export default isAuthentication
