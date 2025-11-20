import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useDeletedTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deletedTask', taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`
      )
      return deletedTask
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.filter((ot) => ot.id !== deletedTask.id)
      })
    },
  })
}
