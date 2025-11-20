import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../lib/axios'

export const useUpdatedTask = ({ taskId, onSuccess }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updatedTask', taskId],
    mutationFn: async (newTask) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, newTask)
      onSuccess(updatedTask)
      return updatedTask
    },
    // cache
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.map((ot) => {
          if (ot.id === taskId) {
            return updatedTask
          }
          return ot
        })
      })
    },
  })
}
