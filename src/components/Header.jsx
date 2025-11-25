import { useState } from 'react'

import { AddIcon, TrashIcon } from '../assets/icons'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'

const Header = ({ subtitle, title }) => {
  const [addTasksDialogIsOpen, setAddTasksDialogIsOpen] = useState(false)

  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button color="ghost">
          Limpar tarefas
          <TrashIcon />
        </Button>
        <Button onClick={() => setAddTasksDialogIsOpen(true)}>
          Adicionar tarefa
          <AddIcon />
        </Button>
      </div>
      <AddTaskDialog
        isOpen={addTasksDialogIsOpen}
        handleCloseDialog={() => setAddTasksDialogIsOpen(false)}
      />
    </div>
  )
}

export default Header
