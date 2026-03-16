import { Draggable } from '@hello-pangea/dnd'
import { useTasks } from './taskContext'

export function KanbanCard({ task, index, onEditClick }) {
  const { removeTask } = useTasks()

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`card cursor-grab active:cursor-grabbing mb-3 bg-white dark:bg-gray-800 border ${
            snapshot.isDragging 
              ? 'border-violet-500 shadow-xl scale-[1.02] rotate-1 z-50' 
              : 'border-gray-100 dark:border-gray-700 hover:shadow-md'
          } transition-all duration-200`}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white text-md line-clamp-2">{task.title}</h4>
            <span className={`badge shrink-0 ml-2 ${
              task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
              task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' :
              'bg-green-100 text-green-700 dark:bg-green-900/30'
            }`}>
              {task.priority}
            </span>
          </div>
          
          {task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-gray-700/50">
            <span className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => onEditClick(task)} 
                className="text-xs font-medium text-gray-400 hover:text-violet-500 transition-colors pointer-events-auto"
              >
                Edit
              </button>
              <button 
                onClick={() => removeTask(task._id)} 
                className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors pointer-events-auto"
              >
                Del
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
