import React, { useState, createRef } from 'react'
import Select from 'react-select'

import PropTypes from 'prop-types'

const MultiSelect = ({
  id,
  className,
  classNamePrefix = 'select',
  name,
  value: valueProp,
  options,
  isDisabled,
  isLoading,
  isClearable,
  isSearchable,

  onChange
}) => {
  const multiSelectElement = createRef()

  const [value, setValue] = useState(valueProp || [])

  const onValueChange = newValue => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <Select
      ref={multiSelectElement}
      isMulti
      className={className}
      classNamePrefix={classNamePrefix}
      id={id}
      name={name}
      value={value}
      options={options}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      onChange={onValueChange}
    />
  )
}

MultiSelect.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default MultiSelect
