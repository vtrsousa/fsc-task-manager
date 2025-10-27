import Button from './Button'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import ClounSunIcon from '../assets/icons/cloud-sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'

const Tasks = () => {
  return (
    <div className="w-full px-16 py-8">
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
          <Button>
            Adicionar tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      {/* Lista de tarefas */}

      <div className="gap-6 space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <SunIcon className="text-[#9A9C9F]" />
            <p className="text-sm text-[#9A9C9F]">Manhã</p>
          </div>

          <div>Tarefa</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <ClounSunIcon className="text-[#9A9C9F]" />
            <p className="text-sm text-[#9A9C9F]">Tarde</p>
          </div>
          <div>Tarefa</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <MoonIcon className="text-[#9A9C9F]" />
            <p className="text-sm text-[#9A9C9F]">Noite</p>
          </div>
          <div>Tarefa</div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
