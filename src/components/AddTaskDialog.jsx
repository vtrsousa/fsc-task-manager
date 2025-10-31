import '../styles/AddTaskDialog.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import Button from './Button'
import Input from './Inputs'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleCloseDialog, handleSubmit }) => {
  const [titleTask, setTitleTask] = useState('')
  const [timeTask, setTimeTask] = useState('morning')
  const [descriptionTask, setDescriptionTask] = useState('')

  const nodeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTimeTask('')
      setTimeTask('')
      setDescriptionTask('')
    }
  }, [isOpen])

  const handleSaveClick = () => {
    handleSubmit({
      id: v4(),
      title: titleTask,
      description: descriptionTask,
      time: timeTask,
      status: 'not_started',
    })
    handleCloseDialog()
  }

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
                  value={titleTask}
                  onChange={(e) => setTitleTask(e.target.value)}
                />
                <TimeSelect
                  value={timeTask}
                  onChange={(e) => setTimeTask(e.target.value)}
                />
                <Input
                  id="description"
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  value={descriptionTask}
                  onChange={(e) => setDescriptionTask(e.target.value)}
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
                  >
                    Salvar
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

export default AddTaskDialog
