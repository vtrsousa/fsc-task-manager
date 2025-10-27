const TasksSeparator = ({ titleTasks, iconTasks }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
      {iconTasks}
      <p className="text-sm text-[#9A9C9F]">{titleTasks}</p>
    </div>
  )
}

export default TasksSeparator
