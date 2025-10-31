import InputLabel from './InputLabel'

const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="w-full rounded-lg border border-solid border-brand-neutral-light px-4 py-3 outline-brand-primary placeholder:text-sm"
        {...rest}
      />
    </div>
  )
}

export default Input
