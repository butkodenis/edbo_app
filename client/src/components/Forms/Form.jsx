/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import Select from './Input/Select';
import Radio from './Input/Radio';

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
              label="Оберіть рік"
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
              label="Оберіть освітній рівень"
              options={qualification}
              onChange={onInputChange}
            />
          </div>
          <div className="col-lg">
            <Select
              name="educationBase"
              value={formData.specialty}
              label="Оберіть основу вступу"
              options={educationBase}
              onChange={onInputChange}
            />
          </div>
        </div>

        <hr className="my-4" />
        <div className="row">
          <div className="col-lg">
            <Radio
              label="Імпорт пропозицій"
              value="saveIds"
              checked={formData.task === 'saveIds'}
              onChange={onInputChange}
            />
          </div>
          <div className="col-lg">
            <Radio
              label="Імпорт статистики пропозицій"
              value="saveStat"
              checked={formData.task === 'saveStat'}
              onChange={onInputChange}
            />
          </div>
          <div className="col-lg">
            <Radio
              label="Імпорт статистики студентів"
              value="saveStud"
              checked={formData.task === 'saveStud'}
              onChange={onInputChange}
            />
          </div>
          <div className="col-lg">
            <Radio
              label="Всі завдання"
              value="saveAll"
              checked={formData.task === 'saveAll'}
              onChange={onInputChange}
            />
          </div>
        </div>

        <hr className="my-4" />
        <button type="submit" className="btn btn-info btn-sm">
          Додати завдання
        </button>
      </div>
    </form>
  );
}

export default Forms;
