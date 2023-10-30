import React from 'react';

function SelectJob({ label, value }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="option"
        value={value}
        id={value}
      />
      <label className="form-check-label" htmlFor={value}>
        {label}
      </label>
    </div>
  );
}

export default SelectJob;
