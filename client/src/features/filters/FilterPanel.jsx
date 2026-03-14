export function FilterPanel({ filters, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <select
        className="input bg-white dark:bg-gray-800 text-sm"
        value={filters.status || ''}
        onChange={(e) => onFilterChange('status', e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <select
        className="input bg-white dark:bg-gray-800 text-sm"
        value={filters.priority || ''}
        onChange={(e) => onFilterChange('priority', e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  )
}
