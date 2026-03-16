import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Circle } from 'lucide-react'
import { useTasks } from './taskContext'
import { KanbanCard } from './KanbanCard'

const COLUMNS = ['Todo', 'In Progress', 'Done']

const COLUMN_STYLES = {
  'Todo': {
    header: 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200',
    border: 'border-gray-200 dark:border-gray-700',
    dot: 'bg-gray-400',
  },
  'In Progress': {
    header: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    border: 'border-blue-100 dark:border-blue-800',
    dot: 'bg-blue-500',
  },
  'Done': {
    header: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    border: 'border-green-100 dark:border-green-800',
    dot: 'bg-green-500',
  },
}

export function KanbanBoard({ tasks, onEditClick }) {
  const { updateTaskStatus } = useTasks()

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // Dropped outside a column, or in the same spot
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const newStatus = destination.droppableId

    // If status changed, persist to server
    if (newStatus !== source.droppableId) {
      updateTaskStatus(draggableId, newStatus)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((columnStatus) => {
          const columnTasks = getTasksByStatus(columnStatus)
          const styles = COLUMN_STYLES[columnStatus]

          return (
            <div
              key={columnStatus}
              className={`flex flex-col rounded-xl border ${styles.border} bg-gray-50 dark:bg-gray-900/50 min-h-[400px]`}
            >
              {/* Column Header */}
              <div className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl ${styles.header}`}>
                <Circle size={10} fill="currentColor" className={styles.dot} />
                <h3 className="font-bold text-xs uppercase tracking-widest">{columnStatus}</h3>
                <span className="ml-auto text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">{columnTasks.length}</span>
              </div>

              {/* Droppable area */}
              <Droppable droppableId={columnStatus}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 p-3 transition-colors duration-200 rounded-b-xl ${
                      snapshot.isDraggingOver 
                        ? 'bg-violet-50 dark:bg-violet-900/20' 
                        : ''
                    }`}
                  >
                    {columnTasks.length === 0 ? (
                      <div className="flex items-center justify-center h-full min-h-[100px]">
                        <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
                          Drop tasks here
                        </p>
                      </div>
                    ) : (
                      columnTasks.map((task, index) => (
                        <KanbanCard key={task._id} task={task} index={index} onEditClick={onEditClick} />
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
