import React from 'react';

function Radio({ label, value, checked, onChange }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="task"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
}

export default Radio;
