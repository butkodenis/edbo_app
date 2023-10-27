/* eslint-disable react/prop-types */
import React from 'react';

function Select({ name, years, label }) {
  return (
    <>
      <label htmlFor={name} className="form-label">
        <strong>{label}</strong>
      </label>
      <select id={name} className="form-select">
        {years.map((year) => (
          <option value={year.code}>{year.name} </option>
        ))}
      </select>
    </>
  );
}

export default Select;
