import React from 'react';

function SelectJob({ label, value }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="option"
        value={value}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
}

export default SelectJob;
