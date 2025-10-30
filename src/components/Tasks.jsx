import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  ClounSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons'
import TASKS from '../constants/tasks'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'
import TaskItem from './TaskItem'
import TasksSeparator from './TasksSeparator'

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)
  const [addTasksDialogIsOpen, setAddTasksDialogIsOpen] = useState(false)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

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

    setTasks(newTasks)
    toast.success('Tarefa atualizada com sucesso!')
  }

  const handleTaskDelete = (taskId) => {
    const newTasks = tasks.filter((t) => {
      return t.id !== taskId
    })

    setTasks(newTasks)
    toast.success('Tarefa deletada com sucesso!')
  }

  const handleAddTaskSubmit = (task) => {
    setTasks([...tasks, task])
    toast.success('Tarefa adicionada com sucesso!')
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
          <Button onClick={() => setAddTasksDialogIsOpen(true)}>
            Adicionar tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      <AddTaskDialog
        isOpen={addTasksDialogIsOpen}
        handleCloseDialog={() => setAddTasksDialogIsOpen(false)}
        handleSubmit={handleAddTaskSubmit}
      />

      <div className="gap-6 space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator titleTasks="Manhã" iconTasks={<SunIcon />} />

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxStatus}
              handleDeleteClick={handleTaskDelete}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator titleTasks="Tarde" iconTasks={<ClounSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxStatus}
              handleDeleteClick={handleTaskDelete}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator titleTasks="Noite" iconTasks={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxStatus}
              handleDeleteClick={handleTaskDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
