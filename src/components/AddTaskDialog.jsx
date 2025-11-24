import '../styles/AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import { useAddedTask } from '../hooks/data/use-add-task'
import Button from './Button'
import Input from './Inputs'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleCloseDialog }) => {
  const {
    register,
    formState: { errors, isSubmitting: loading },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: '',
      description: '',
    },
  })

  const { mutate: addTask, isPending } = useAddedTask()

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time,
      status: 'not_started',
    }

    addTask(task, {
      onSuccess: () => {
        toast.error('Tarefa criada com sucesso!')
        handleCloseDialog(false)
        reset()
      },
      onError: () => toast.error('Erro ao criar tarefa, tente novamente.'),
    })
  }

  const handleCancelClick = () => {
    reset()
    handleCloseDialog(false)
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <>
        {createPortal(
          <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
            <div className="rounded-xl bg-white p-5 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="my-1 mb-4 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>
              <form
                className="flex w-[336px] flex-col gap-4"
                onSubmit={handleSubmit(handleSaveClick)}
              >
                <Input
                  id="title"
                  placeholder="Insira o título da tarefa"
                  label="Título"
                  disabled={loading}
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
                <TimeSelect
                  {...register('time', {
                    required: 'O horário é um campo obrigatório.',
                  })}
                  errorMessage={errors?.time?.message}
                  disabled={loading}
                />
                <Input
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  disabled={loading}
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
                <div className="flex justify-between gap-3">
                  <Button
                    color="secondary"
                    size="large"
                    className="w-full"
                    type="button"
                    onClick={handleCancelClick}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isPending}
                  >
                    {!isPending ? (
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
          </div>,
          document.body
        )}
      </>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddTaskDialog
