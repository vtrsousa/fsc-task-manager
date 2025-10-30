import '../styles/AddTaskDialog.css'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Button from './Button'
import InputLabel from './InputLabel'
import Input from './Inputs'

const AddTaskDialog = ({ isOpen, handleCloseDialog }) => {
  const nodeRef = useRef()

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
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="my-1 mb-4 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>
              <div className="flex w-[336px] flex-col gap-4">
                <Input
                  id="title"
                  placeholder="Insira o título da tarefa"
                  label="Título"
                />
                <div className="flex flex-col space-y-1 text-left">
                  <InputLabel htmlFor="time">Horário</InputLabel>
                  <select
                    id="time"
                    className="w-full rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm"
                  >
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="evening">Noite</option>
                  </select>
                </div>

                <Input
                  id="description"
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                />
                <div className="flex justify-between gap-3">
                  <Button
                    variant="secondary"
                    size="large"
                    className="w-full"
                    onClick={() => handleCloseDialog()}
                  >
                    Cancelar
                  </Button>
                  <Button size="large" className="w-full">
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
