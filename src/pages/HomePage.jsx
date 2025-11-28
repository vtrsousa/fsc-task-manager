import DashboardCards from '../components/DashboardCards'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TaskItem from '../components/TaskItem'
import { useGetTasks } from '../hooks/data/use-get-tasks'

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-16 py-8">
        <Header title="Dashboard" subtitle="Dashboard" />
        <DashboardCards />

        <div className="grid grid-cols-[2fr_1fr] gap-4">
          <div className="space-y-6 rounded-[10px] bg-brand-white p-6">
            <div>
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-sm text-brand-dark-gray">
                Resumo das tarefas disponíveis
              </span>
            </div>
            <div className="space-y-3">
              {tasks?.length === 0 ? (
                <span>Nenhuma tarefa registrada.</span>
              ) : (
                tasks?.map((task) => (
                  <TaskItem key={task.id} task={task} color={task.status} />
                ))
              )}
            </div>
          </div>
          <div className="flex items-center justify-center rounded-[10px] bg-brand-white p-6">
            <p className="text-sm text-brand-dark-gray">
              “Disciplina hoje, tranquilidade amanhã — finalize o que começou e
              feche o dia no lucro.”
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
