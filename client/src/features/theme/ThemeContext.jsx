import { createContext, useState, useEffect, useContext } from 'react'

// Create the context
export const ThemeContext = createContext()

// Custom hook for easy access
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

// Provider component
export function ThemeProvider({ children }) {
  // Read saved preference from localStorage, default to 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('planify-theme') || 'light'
  )

  // Apply/remove 'dark' class on <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    // Persist choice to localStorage
    localStorage.setItem('planify-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
