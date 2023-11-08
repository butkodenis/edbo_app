/* eslint-disable react/prop-types */
import React from 'react';

function Select({ name, value, options, label, onChange }) {
  return (
    <>
      <label htmlFor={name} className="form-label">
        <strong>{label}</strong>
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}{' '}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
