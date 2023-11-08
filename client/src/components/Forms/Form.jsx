/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Select from './Input/Select';
import SelectJob from './Input/SelectJob';
import dictionary from '../dict';

function Forms({ formData, onInputChange, onSubmit }) {
  const { years, specialty, qualification, educationBase } = dictionary;

  return (
    <form onSubmit={onSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-lg">
            <Select
              name="year"
              value={formData.year}
              label="Оберіть спеціальність"
              options={years}
              onChange={onInputChange}
            />
          </div>
          <div className="col-lg">
            <Select
              name="specialty"
              value={formData.specialty}
              label="Оберіть спеціальність"
              options={specialty}
              onChange={onInputChange}
            />
          </div>
          <div className="col-lg">
            <Select
              name="qualification"
              value={formData.specialty}
              label="Оберіть спеціальність"
              options={qualification}
              onChange={onInputChange}
            />
          </div>
          <div className="col-lg">
            <Select
              name="educationBase"
              value={formData.specialty}
              label="Оберіть спеціальність"
              options={educationBase}
              onChange={onInputChange}
            />
          </div>
        </div>

        <hr className="my-4" />
        <hr className="my-4" />
        <button type="submit" className="btn btn-info btn-sm">
          Додати завдання
        </button>
      </div>
    </form>
  );
}

export default Forms;
