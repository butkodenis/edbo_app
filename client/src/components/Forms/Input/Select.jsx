/* eslint-disable react/prop-types */
import React from 'react';

function Select({ name, values, label, onChange }) {
  return (
    <>
      <label htmlFor={name} className="form-label">
        <strong>{label}</strong>
      </label>
      <select id={name} className="form-select" onChange={onChange}>
        {values.map((val) => (
          <option key={val.code} value={val.code}>
            {val.name}{' '}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
