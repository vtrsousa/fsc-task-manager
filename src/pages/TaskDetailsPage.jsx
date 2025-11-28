import Sidebar from '../components/Sidebar'
import TaskDetails from '../components/TaskDetails'

const TaskDetailsPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <TaskDetails />
    </div>
  )
}

export default TaskDetailsPage
