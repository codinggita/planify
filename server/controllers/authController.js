import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// Logic to calculate productivity streak
const calculateStreak = (user) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  if (!user.lastActive) {
    user.streak = 1
    user.lastActive = now
    return
  }

  const lastActiveDate = new Date(user.lastActive)
  const lastActiveMidnight = new Date(lastActiveDate.getFullYear(), lastActiveDate.getMonth(), lastActiveDate.getDate())
  
  // Calculate difference in whole days
  const diffTime = Math.abs(today - lastActiveMidnight)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    // Was active yesterday, increment streak
    user.streak += 1
  } else if (diffDays > 1) {
    // Missed a day, reset streak
    user.streak = 1
  }
  // If diffDays === 0, they were already active today, streak remains the same

  user.lastActive = now
}

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' })
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password, // hashed in pre-save hook
      streak: 1,
      lastActive: new Date(),
    })

    if (user) {
      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          streak: user.streak,
        },
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      // Update streak
      calculateStreak(user)
      await user.save()

      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          streak: user.streak,
        },
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    // The user document is passed from authMiddleware, find it again to save updates
    const user = await User.findById(req.user._id)
    
    if (user) {
      calculateStreak(user)
      await user.save()

      const userData = {
        id: user._id,
        email: user.email,
        name: user.name,
        streak: user.streak,
      }
      res.status(200).json(userData)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
