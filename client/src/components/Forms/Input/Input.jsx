import React from 'react';

function Input({ name, label, register }) {
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <label htmlFor={name} className="form-label">
        <strong>{label}</strong>
      </label>
      <input
        type="date"
        className="form-control"
        id={name}
        {...register(name)}
        max={currentDate}
      />
    </>
  );
}
export default Input;
