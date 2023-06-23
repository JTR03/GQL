import React from 'react'

const Tasks = ({tasks}) => {
  return (
    <ul>

      {tasks.map(t => 
        
            <li>{t.task}</li>
        
      )}
    </ul>
  )
}

export default Tasks
