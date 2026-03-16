import express from 'express'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  getGlobalStats,
} from '../controllers/taskController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/public/stats', getGlobalStats)

// Apply protect middleware to all following task routes
router.use(protect)

router.route('/stats').get(getTaskStats)
router.route('/').get(getTasks).post(createTask)
router.route('/:id').put(updateTask).delete(deleteTask)

export default router
