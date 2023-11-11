/* eslint-disable react/prop-types */
import React from 'react';

function Select({ name, options, label, register }) {
  return (
    <>
      <label htmlFor={name} className="form-label">
        <strong>{label}</strong>
      </label>
      <select id={name} className="form-select" {...register(name)}>
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
