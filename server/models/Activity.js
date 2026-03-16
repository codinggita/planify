import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    action: {
      type: String,
      required: true,
      enum: ['CREATED_TASK', 'STARTED_TASK', 'COMPLETED_TASK', 'DELETED_TASK'],
    },
    taskTitle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Activity = mongoose.model('Activity', activitySchema)

export default Activity
