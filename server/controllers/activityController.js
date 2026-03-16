import Activity from '../models/Activity.js'

// @desc    Get user's recent activity
// @route   GET /api/activity
// @access  Private
export const getRecentActivity = async (req, res) => {
  try {
    // Fetch the 15 most recent activities for the logged-in user
    const activities = await Activity.find({ user: req.user._id })
      .sort({ createdAt: -1 }) // Descending (newest first)
      .limit(15)

    res.status(200).json(activities)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
