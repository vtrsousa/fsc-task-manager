const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant == 'selected') return 'bg-[#E6F7F8] text-[#00ADB5]'
    if (variant == 'unselected') return ' text-[#35383e]'
  }

  return (
    <a href="#" className={`gap-2 rounded-lg px-6 py-3 ${getVariantClasses()}`}>
      {children}
    </a>
  )
}

export default SidebarButton
