import InputLabel from './InputLabel'

const TimeSelect = ({ value, onChange, errorMessage }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className={`border-brand-menu-primary-light w-full rounded-lg border border-solid px-4 py-3 outline-brand-primary ${!value ? 'text-sm text-gray-400' : 'text-brand-dark-blue'}`}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Selecione um horário
        </option>
        <option value="morning" className="text-brand-dark-blue">
          Manhã
        </option>
        <option value="afternoon" className="text-brand-dark-blue">
          Tarde
        </option>
        <option value="evening" className="text-brand-dark-blue">
          Noite
        </option>
      </select>
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default TimeSelect
