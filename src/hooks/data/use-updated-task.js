import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdatedTask = ({ taskId, onSuccess }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updatedTask', taskId],
    mutationFn: async (newTask) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(newTask),
      })

      if (!response.ok) throw new Error()
      const updatedTask = await response.json()
      // reset
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
