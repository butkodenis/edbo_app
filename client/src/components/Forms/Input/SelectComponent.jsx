import React from 'react';

function SelectComponent({ name, value, options, handleChange }) {
  return (
    <div>
      <label>
        {name}:
        <select name={name} value={value} onChange={handleChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SelectComponent;
