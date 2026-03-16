import { useState, useEffect } from 'react'
import { useTasks } from '../features/tasks/taskContext'
import TaskFormModal from '../features/tasks/TaskFormModal'
import { SearchBar } from '../features/search/SearchBar'
import { FilterPanel } from '../features/filters/FilterPanel'
import { SortDropdown } from '../features/filters/SortDropdown'
import { Pagination } from '../features/pagination/Pagination'
import { ProgressTracker } from '../features/tasks/ProgressTracker'
import { KanbanBoard } from '../features/tasks/KanbanBoard'

function Dashboard() {
  const { tasks, pagination, loading, error, fetchTasks, removeTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState('list') // 'list' | 'board'
  const [editingTask, setEditingTask] = useState(null)

  // State for all query parameters including pagination
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sort: '',
    pageNumber: 1,
  })

  // Re-fetch tasks whenever filters or viewMode changes
  useEffect(() => {
    if (viewMode === 'board') {
      // Fetch all tasks for kanban (no pagination)
      fetchTasks({ ...filters, pageNumber: 1, limit: 100 })
    } else {
      fetchTasks(filters)
    }
  }, [filters, viewMode])

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm, pageNumber: 1 }))
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, pageNumber: 1 }))
  }

  const handleSortChange = (value) => {
    setFilters(prev => ({ ...prev, sort: value, pageNumber: 1 }))
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, pageNumber: newPage }))
  }

  const handleNewTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  return (
    <div className="page flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col flex-1">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your tasks and track productivity
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap self-start sm:self-auto">
            {/* View toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                ☰ List
              </button>
              <button
                onClick={() => setViewMode('board')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'board'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                ⬛ Board
              </button>
            </div>

            <button 
              onClick={handleNewTask}
              className="btn-primary flex items-center gap-2"
            >
              <span className="text-lg leading-none">+</span>
              New Task
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <ProgressTracker />

        {/* Search, Filters & Sort Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          <SearchBar onSearch={handleSearch} />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full lg:w-auto">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
            <SortDropdown sort={filters.sort} onSortChange={handleSortChange} />
          </div>
        </div>

        <TaskFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          editingTask={editingTask}
        />

        {/* Content Area */}
        <div className="flex-1">
          {loading ? (
            <div className={viewMode === 'board' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
              {[...Array(viewMode === 'board' ? 3 : 6)].map((_, i) => (
                <div key={i} className={`${viewMode === 'board' ? 'min-h-[300px]' : 'card'} animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl`}>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3 m-4" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full mb-2 mx-4" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
              Failed to load tasks: {error}
            </div>
          ) : viewMode === 'board' ? (
            <KanbanBoard tasks={tasks} onEditClick={handleEditClick} />
          ) : tasks.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800">
              <span className="text-4xl block mb-4">🎯</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No tasks found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(task => (
                <div key={task._id} className="card hover:shadow-md transition-shadow cursor-default flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{task.title}</h3>
                    <span className={`badge ${
                      task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                      task.status === 'Done' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {task.status}
                    </span>
                    
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(task)} className="text-sm font-medium text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Edit</button>
                      <button onClick={() => removeTask(task._id)} className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors">Del</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination — only in list mode */}
        {!loading && viewMode === 'list' && (
          <Pagination 
            currentPage={pagination.page} 
            totalPages={pagination.pages} 
            onPageChange={handlePageChange} 
          />
        )}

      </div>
    </div>
  )
}

export default Dashboard
