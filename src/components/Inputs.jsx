import InputLabel from './InputLabel'

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <>
      <div className="flex flex-col space-y-1 text-left">
        <InputLabel htmlFor={rest.id}>{label}</InputLabel>
        <input
          className="w-full rounded-lg border border-solid border-brand-neutral-light px-4 py-3 outline-brand-primary placeholder:text-sm"
          {...rest}
        />
      </div>
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </>
  )
}

export default Input
