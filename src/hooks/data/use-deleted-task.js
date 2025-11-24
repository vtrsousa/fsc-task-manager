import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskQueries } from '../../keys/queries'
import { api } from '../lib/axios'

export const useDeletedTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deletedTask', taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(taskQueries.getAll(), (oldTasks) => {
        return oldTasks.filter((ot) => ot.id !== deletedTask.id)
      })
    },
  })
}
