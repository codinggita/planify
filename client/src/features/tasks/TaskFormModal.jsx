import { useState, useEffect } from 'react'
import Modal from '../../components/Modal'
import { useTasks } from './taskContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '../validation/schemas'

function TaskFormModal({ isOpen, onClose, editingTask = null }) {
  const { addTask, editTask } = useTasks()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      notes: '',
      priority: 'Medium',
      status: 'Todo'
    }
  })

  // Prefill form if editing an existing task
  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title || '',
        description: editingTask.description || '',
        notes: editingTask.notes || '',
        priority: editingTask.priority || 'Medium',
        status: editingTask.status || 'Todo',
      })
    } else {
      reset({
        title: '',
        description: '',
        notes: '',
        priority: 'Medium',
        status: 'Todo'
      })
    }
  }, [editingTask, reset, isOpen])

  // Reset form when closed
  const handleClose = () => {
    reset()
    setServerError(null)
    onClose()
  }

  const onSubmit = async (data) => {
    setLoading(true)
    setServerError(null)
    
    let res
    if (editingTask) {
      res = await editTask(editingTask._id, data)
    } else {
      res = await addTask(data)
    }
    
    setLoading(false)
    if (res.success) {
      handleClose()
    } else {
      setServerError(res.error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={editingTask ? "Edit Task" : "Create New Task"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 p-3 rounded-lg text-sm">
            {serverError}
          </div>
        )}

        <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
             Task Title <span className="text-red-500">*</span>
           </label>
           <input
             type="text"
             {...register('title')}
             placeholder="What needs to be done?"
             className={`input ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
             autoFocus
           />
           {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
             Description
           </label>
           <textarea
             {...register('description')}
             placeholder="Add details..."
             className={`input min-h-[80px] resize-y ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
           />
           {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
             Notes
           </label>
           <textarea
             {...register('notes')}
             placeholder="Long-form rich notes, meeting minutes, resources..."
             className={`input min-h-[140px] resize-y font-mono text-sm ${errors.notes ? 'border-red-500 focus:ring-red-500' : ''}`}
           />
           {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>}
         </div>

         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
               Priority
             </label>
             <select
               {...register('priority')}
               className="input bg-white dark:bg-gray-800"
             >
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="High">High</option>
             </select>
             {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
           </div>
           
           {/* Status is only changeable when CREATING a task - Show as read-only badge when editing */}
           {editingTask ? (
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                 Current Status
               </label>
               <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold text-violet-600 dark:text-violet-400">
                 {editingTask.status}
               </div>
             </div>
           ) : (
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                 Status
               </label>
               <select
                 {...register('status')}
                 className="input bg-white dark:bg-gray-800"
               >
                 <option value="Todo">Todo</option>
                 <option value="In Progress">In Progress</option>
                 <option value="Done">Done</option>
               </select>
               {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
             </div>
           )}
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
             disabled={loading}
             className="btn-primary"
           >
             {loading ? 'Saving...' : editingTask ? 'Save Changes' : 'Create Task'}
           </button>
         </div>
       </form>
     </Modal>
  )
}

export default TaskFormModal
