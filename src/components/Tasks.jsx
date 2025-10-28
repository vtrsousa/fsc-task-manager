import Button from './Button'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import ClounSunIcon from '../assets/icons/cloud-sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import TasksSeparator from './TasksSeparator'
import TASKS from '../constants/tasks'
import { useState } from 'react'
import TaskItem from './TaskItem'

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskCheckboxClick = (taskId) => {
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
    setTasks(newTasks)
  }

  return (
    <div className="w-full space-y-6 px-16 py-8">
      <div className="flex w-full items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button>
            Adicionar tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="gap-6 space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator titleTasks="Manhã" iconTasks={<SunIcon />} />

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator titleTasks="Tarde" iconTasks={<ClounSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator titleTasks="Noite" iconTasks={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
