import { useQuery } from '@tanstack/react-query'

import { taskQueries } from '../../keys/queries'
import { api } from '../lib/axios'

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueries.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get('/tasks')
      return tasks
    },
  })
}
