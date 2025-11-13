import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Inputs'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [errors, setErrors] = useState([])
  const [saveIsLoading, setSaveIsLoading] = useState(false)

  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  const handleSaveClick = async () => {
    setSaveIsLoading(true)
    const newErrors = []
    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      })
    }

    setErrors(newErrors)
    if (newErrors.length > 0) return setSaveIsLoading(false)

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    })

    if (!response.ok) {
      setSaveIsLoading(false)
      return toast.error('Erro ao salvar tarefa, tente novamente.')
    }

    const newTask = await response.json()
    setTask(newTask)
    toast.error('Tarefa salva com sucesso!')
    setSaveIsLoading(false)
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
              <Link className="text-brand-text-gray" to="/">
                Minhas Tarefas
              </Link>
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
            <Input
              id="title"
              label="Título"
              errorMessage={titleError?.message}
              ref={titleRef}
              defaultValue={task?.title}
            />
          </div>
          <div>
            <TimeSelect
              errorMessage={timeError?.message}
              ref={timeRef}
              defaultValue={task?.time}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
              defaultValue={task?.description}
            />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button color="secondary" size="large">
            Cancelar
          </Button>
          <Button
            size="large"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {!saveIsLoading ? (
              'Salvar'
            ) : (
              <>
                <LoaderIcon className="animate-spin text-brand-white" />{' '}
                Salvando
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
