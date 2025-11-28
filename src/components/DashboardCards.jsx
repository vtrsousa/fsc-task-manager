import { AddIcon, LayoutListIcon, LoaderIcon, TaksIcon } from '../assets/icons'
import DashboardCard from '../components/DashboardCard'
import { useGetTasks } from '../hooks/data/use-get-tasks'

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter(
    (task) => task.status === 'not_started'
  ).length
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length
  const doneTasks = tasks?.filter((task) => task.status === 'done').length

  const totalTasks = tasks?.length

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<LayoutListIcon />}
        mainText={totalTasks}
        secondaryText="Tarefas Totais"
      />
      <DashboardCard
        icon={<AddIcon />}
        mainText={notStartedTasks}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoaderIcon className="animate-spin" />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<TaksIcon />}
        mainText={doneTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  )
}

export default DashboardCards
