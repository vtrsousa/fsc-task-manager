import { createPortal } from 'react-dom'

import Button from './Button'
import Input from './Inputs'

const AddTaskDialog = ({ isOpen, handleCloseDialog }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="my-1 mb-4 text-sm text-[#9A9C9F]">
          Insira as informações abaixo
        </p>
        <div className="flex w-[336px] flex-col gap-4">
          <Input
            id="title"
            placeholder="Insira o título da tarefa"
            label="Título"
          />
          <Input id="time" placeholder="Horário" label="Horário" />
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
  )
}

export default AddTaskDialog
