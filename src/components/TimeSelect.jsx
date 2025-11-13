import PropTypes from 'prop-types'

import InputLabel from './InputLabel'

const TimeSelect = ({ value, onChange, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className={`border-brand-menu-primary-light w-full rounded-lg border border-solid px-4 py-3 outline-brand-primary`}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {/* <option value="" disabled selected>
          Selecione um horário
        </option> */}
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

TimeSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

export default TimeSelect
