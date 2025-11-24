import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskQueries } from '../../keys/queries'
import { api } from '../lib/axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post('/tasks', task)
      return createdTask
    },
    // Deixar aqui tudo o que responsavel pelo cache, req etc
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueries.getAll(), (oldTasks) => {
        return [...oldTasks, createdTask]
      })
    },
  })
}
