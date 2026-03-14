export function SortDropdown({ sort, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">Sort by:</span>
      <select
        className="input bg-white dark:bg-gray-800 text-sm py-1.5"
        value={sort || ''}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="priority">Priority (High first)</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  )
}
