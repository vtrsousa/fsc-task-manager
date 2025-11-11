import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
        const data = await response.json()

        setTask(data)
      } catch (error) {
        console.error('error res', error)
      }
    }

    fetchTasks()
  }, [taskId])

  return <h1>{task?.title}</h1>
}

export default TaskDetailsPage
