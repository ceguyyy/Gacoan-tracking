import React from 'react'
import TaskActivity from './TaskActivity'
import { ThemeProvider } from './views/styles/ThemeContext'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <TaskActivity />
    </ThemeProvider>
  )
}

export default App
