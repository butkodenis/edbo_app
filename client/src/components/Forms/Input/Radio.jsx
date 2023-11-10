import React from 'react';

function Radio({ name, value, label, register }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={name}
        value={value}
        id={value}
        {...register(name)}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
}

export default Radio;
