import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Tasks from '../components/Tasks'

function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-16 py-8">
        <Header title="Minhas tarefas" subtitle="Minhas Tarefas" />
        <Tasks />
      </div>
    </div>
  )
}

export default TasksPage
