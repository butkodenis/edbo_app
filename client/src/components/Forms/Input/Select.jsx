/* eslint-disable react/prop-types */
import React from 'react';

function Select({ name, values, label }) {
  return (
    <>
      <label htmlFor={name} className="form-label">
        <strong>{label}</strong>
      </label>
      <select id={name} className="form-select">
        {values.map((val) => (
          <option value={val.code}>{val.name} </option>
        ))}
      </select>
    </>
  );
}

export default Select;
