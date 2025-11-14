import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const {
    register,
    formState: { errors, isSubmitting: loading },
    handleSubmit,
    reset,
  } = useForm()

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return toast.error('Erro ao deletar tarefa, tente novamente.')
    }

    toast.error('Tarefa deletada com sucesso.')
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    })

    if (!response.ok) {
      return toast.error('Erro ao salvar tarefa, tente novamente.')
    }

    const newTask = await response.json()
    setTask(newTask)
    toast.error('Tarefa salva com sucesso!')
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
        const data = await response.json()

        setTask(data)
        reset(data)
      } catch (error) {
        console.error('error res', error)
      }
    }

    fetchTasks()
  }, [taskId, reset])

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
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon /> Deletar Tarefa
          </Button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register('title', {
                  required: 'O título é um campo obrigatório.',
                  min: {
                    value: 5,
                    message: 'O titulo deve ter no mínimo 5 caracteres.',
                  },
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                {...register('time', {
                  required: 'O horário é um campo obrigatório.',
                })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register('description', {
                  required: 'A descrição é um campo obrigatório.',
                  min: {
                    value: 5,
                    message: 'A descrição deve ter no mínimo 5 caracteres.',
                  },
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button color="secondary" size="large">
              Cancelar
            </Button>
            <Button size="large" disabled={loading} type="submit">
              {!loading ? (
                'Salvar'
              ) : (
                <>
                  <LoaderIcon className="animate-spin text-brand-white" />{' '}
                  Salvando
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
