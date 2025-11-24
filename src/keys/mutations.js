export const taskMutationKeys = {
  added: () => ['add-task'],
  updated: (taskId) => ['updated-task', taskId],
  deleted: (taskId) => ['deleted-task', taskId],
}
