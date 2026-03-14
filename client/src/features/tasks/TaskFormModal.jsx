import { useState } from 'react'
import Modal from '../../components/Modal'
import { useTasks } from './taskContext'

function TaskFormModal({ isOpen, onClose }) {
  const { addTask } = useTasks()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo'
  })

  // Reset form when opened
  const handleClose = () => {
    setFormData({ title: '', description: '', priority: 'Medium', status: 'Todo' })
    setError(null)
    onClose()
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title) return

    setLoading(true)
    setError(null)
    
    // Call the addTask function from Context (which calls Axios which calls MongoDB)
    const res = await addTask(formData)
    
    setLoading(false)
    if (res.success) {
      handleClose()
    } else {
      setError(res.error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="input"
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details..."
            className="input min-h-[100px] resize-y"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="input bg-white dark:bg-gray-800"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input bg-white dark:bg-gray-800"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 mt-6 border-t border-gray-100 dark:border-gray-800">
          <button 
            type="button" 
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading || !formData.title}
            className="btn-primary"
          >
            {loading ? 'Saving...' : 'Create Task'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskFormModal
