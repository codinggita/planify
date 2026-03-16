import { Draggable } from '@hello-pangea/dnd'
import { Edit2, Trash2, Calendar } from 'lucide-react'
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
          className={`group bg-white dark:bg-gray-800 p-5 rounded-2xl border transition-all duration-300 mb-4 ${
            snapshot.isDragging 
              ? 'border-violet-500 shadow-2xl scale-[1.05] rotate-2 z-50' 
              : 'border-gray-100 dark:border-gray-700 hover:border-violet-200 dark:hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {task.title}
            </h4>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md shrink-0 ml-2 ${
              task.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
              task.priority === 'Medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
              'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
            }`}>
              {task.priority}
            </span>
          </div>
          
          {task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 dark:border-gray-700/50">
            <div className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
              <Calendar size={12} />
              {new Date(task.createdAt).toLocaleDateString()}
            </div>
            
            <div className="flex gap-1.5 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <button 
                onClick={() => onEditClick(task)} 
                className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all"
                title="Edit Task"
              >
                <Edit2 size={12} />
              </button>
              <button 
                onClick={() => removeTask(task._id)} 
                className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
                title="Delete Task"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>

        </div>
      )}
    </Draggable>
  )
}
