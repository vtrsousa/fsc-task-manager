import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ClounSunIcon, MoonIcon, SunIcon } from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { taskQueries } from '../keys/queries'
import Header from './Header'
import TaskItem from './TaskItem'
import TasksSeparator from './TasksSeparator'

const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  const handleCheckboxStatus = (taskId) => {
    const newStatusTask = {
      not_started: 'in_progress',
      in_progress: 'done',
      done: 'not_started',
    }

    const newTasks = tasks.map((t) =>
      t.id === taskId
        ? { ...t, status: newStatusTask[t.status] || t.status }
        : t
    )
    queryClient.setQueryData(taskQueries.getAll(), newTasks)
    toast.success('Tarefa atualizada com sucesso!')
  }

  return (
    <div className="w-full space-y-6 px-16 py-8">
      <Header title="Minhas tarefas" subtitle="Minhas Tarefas" />

      <div className="gap-6 space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator titleTasks="Manhã" iconTasks={<SunIcon />} />

          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxStatus}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator titleTasks="Tarde" iconTasks={<ClounSunIcon />} />
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxStatus}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator titleTasks="Noite" iconTasks={<MoonIcon />} />
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxStatus}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
