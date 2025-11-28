import { ClounSunIcon, MoonIcon, SunIcon } from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import TaskItem from './TaskItem'
import TasksSeparator from './TasksSeparator'

const Tasks = () => {
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  return (
    <div className="gap-6 space-y-6 rounded-xl bg-white p-6">
      <div className="space-y-3">
        <TasksSeparator titleTasks="Manhã" iconTasks={<SunIcon />} />

        {morningTasks?.map((task) => (
          <TaskItem key={task.id} task={task} color={task.status} />
        ))}
      </div>

      <div className="space-y-3">
        <TasksSeparator titleTasks="Tarde" iconTasks={<ClounSunIcon />} />
        {afternoonTasks?.map((task) => (
          <TaskItem key={task.id} task={task} color={task.status} />
        ))}
      </div>

      <div className="space-y-3">
        <TasksSeparator titleTasks="Noite" iconTasks={<MoonIcon />} />
        {eveningTasks?.map((task) => (
          <TaskItem key={task.id} task={task} color={task.status} />
        ))}
      </div>
    </div>
  )
}

export default Tasks
