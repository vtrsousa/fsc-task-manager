import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons'
import Button from '../components/Button'
import InputLabel from '../components/InputLabel'
import Input from '../components/Inputs'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()

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

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-16 py-8">
        <div className="flex w-full justify-between">
          <div>
            <button className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary">
              <ArrowLeftIcon className="text-brand-white" />
            </button>
            <div className="flex items-center gap-1 text-sm">
              <span
                className="cursor-pointer text-brand-text-gray"
                onClick={handleBackClick}
              >
                Minhas Tarefas
              </span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-1 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button className="h-fit self-end" color="danger">
            <TrashIcon /> Deletar Tarefa
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input id="title" label="Título" value={task?.title} />
          </div>
          <div>
            <TimeSelect value={task?.time} />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button color="secondary" size="large">
            Cancelar
          </Button>
          <Button size="large">Salvar</Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
