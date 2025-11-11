import '../styles/AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import Button from './Button'
import Input from './Inputs'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleCloseDialog, onSubmitSucess }) => {
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState([])
  const [submitIsLoading, setSubmitIsLoading] = useState(false)

  const nodeRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()

  const handleSaveClick = async () => {
    setSubmitIsLoading(true)
    const newErrors = []
    const title = titleRef.current.value
    const description = descriptionRef.current.value

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
    if (newErrors.length > 0) return

    const task = {
      id: v4(),
      title,
      description,
      time,
      status: 'not_started',
    }

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      setSubmitIsLoading(false)
      return toast.error('Erro ao adicionar tarefa, tente novamente.')
    }

    setSubmitIsLoading(false)
    onSubmitSucess(task)
    handleCloseDialog()
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="my-1 mb-4 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>
              <div className="flex w-[336px] flex-col gap-4">
                <Input
                  id="title"
                  placeholder="Insira o título da tarefa"
                  label="Título"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                  disabled={submitIsLoading}
                />
                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  errorMessage={timeError?.message}
                  disabled={submitIsLoading}
                />
                <Input
                  id="description"
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                  disabled={submitIsLoading}
                />
                <div className="flex justify-between gap-3">
                  <Button
                    color="secondary"
                    size="large"
                    className="w-full"
                    onClick={() => handleCloseDialog()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={submitIsLoading}
                  >
                    {!submitIsLoading ? (
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
