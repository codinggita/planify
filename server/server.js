import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

// Load env vars
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Enable CORS
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)

// Custom error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
