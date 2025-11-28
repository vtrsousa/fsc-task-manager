import { useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { tv } from 'tailwind-variants'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import { useDeletedTask } from '../hooks/data/use-deleted-task'
import { useUpdatedTask } from '../hooks/data/use-updated-task'
import { taskQueries } from '../keys/queries'
import Button from './Button'

const TaskItem = ({ task, color }) => {
  const { reset } = useForm()
  const queryClient = useQueryClient()
  const { mutate: deletedTask, isPending } = useDeletedTask(task.id)
  const { mutate: updatedTask } = useUpdatedTask({
    taskId: task?.id,
    onSuccess: reset,
  })

  const handleCheckboxClick = () => {
    const newStatusTask = {
      not_started: 'in_progress',
      in_progress: 'done',
      done: 'not_started',
    }

    updatedTask(
      {
        ...task,
        status: newStatusTask[task.status] || task.status,
      },
      {
        onSuccess: () => toast.success('Tarefa atualizada com sucesso!'),
        onError: () =>
          toast.success('Erro ao atualizar tarefa, tente novamente.'),
      }
    )
  }

  const handleDeleteClick = async () => {
    deletedTask(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(taskQueries.getAll(), (oldTasks) => {
          return oldTasks.filter((ot) => ot.id !== task.id)
        })
        toast.error('Tarefa deletada com sucesso!')
      },
      onError: () => toast.error('Erro ao deletar tarefa, tente novamente.'),
    })
  }

  const taskItem = tv({
    base: 'flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition',
    variants: {
      color: {
        not_started: 'bg-brand-dark-blue/10 text-brand-dark-blue',
        in_progress: 'bg-brand-process/10 text-brand-process',
        done: 'bg-brand-primary/10 text-brand-primary',
      },
    },
    defaultVariants: {
      color: 'not_started',
    },
  })

  return (
    <div className={taskItem({ color, intent: 'primary' })}>
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-brand-dark-blue/5`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckboxClick}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-1">
        <Button
          color="ghost"
          className="transition hover:opacity-75"
          onClick={handleDeleteClick}
          disabled={isPending}
        >
          {!isPending ? (
            <TrashIcon className="text-brand-text-gray" />
          ) : (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          )}
        </Button>
        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    descriptio: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default TaskItem
