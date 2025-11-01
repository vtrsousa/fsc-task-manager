import PropTypes from 'prop-types'

const TasksSeparator = ({ titleTasks, iconTasks }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-brand-neutral-light pb-1">
      {iconTasks}
      <p className="text-sm text-brand-text-gray">{titleTasks}</p>
    </div>
  )
}

TasksSeparator.propTypes = {
  titleTasks: PropTypes.string.isRequired,
  iconTasks: PropTypes.node.isRequired,
}

export default TasksSeparator
