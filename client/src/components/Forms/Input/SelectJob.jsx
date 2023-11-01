import React from 'react';

function SelectJob({ label, value, selectedJob, setSelectedJob }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="option"
        value={value}
        id={value}
        checked={selectedJob === value}
        onChange={() => setSelectedJob(value)}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
}

export default SelectJob;
