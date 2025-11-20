import { useMutation, useQueryClient } from '@tanstack/react-query'

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
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.filter((ot) => ot.id !== deletedTask.id)
      })
    },
  })
}
