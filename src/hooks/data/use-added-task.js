import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { taskQueries } from '../../keys/queries'
import { api } from '../lib/axios'

export const useAddedTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.added(),
    mutationFn: async (task) => {
      const { data: addedTask } = await api.post('/tasks', task)
      return addedTask
    },
    // Deixar aqui tudo o que responsavel pelo cache, req etc
    onSuccess: (addedTask) => {
      queryClient.setQueryData(taskQueries.getAll(), (oldTasks) => {
        return [...oldTasks, addedTask]
      })
    },
  })
}
