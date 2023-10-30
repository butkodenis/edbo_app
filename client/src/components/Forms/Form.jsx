import React, { useState } from 'react';
import Select from './Input/Select';
import SelectJob from './Input/SelectJob';
import dictionary from '../dict';

function Forms() {
  const { years, specialty, qualification, educationBase } = dictionary;
  const [selectedJob, setSelectedJob] = useState('');
  const handleClick = (event) => {
    event.preventDefault();
    console.log('testing');
  };

  return (
    <form>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Select name="yearSelect" label="Оберіть рік" values={years} />
          </div>
          <div className="col-lg-6">
            <Select
              name="specialtySelect"
              label="Оберіть спеціальність"
              values={specialty}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Select
              name="qualificationySelect"
              label="Оберіть освітній рівень"
              values={qualification}
            />
          </div>
          <div className="col-lg-6">
            <Select
              name="seducationBaseSelect"
              label="Оберіть основу вступу"
              values={educationBase}
            />
          </div>
        </div>
        <hr className="my-4" />
        <div className="d-flex justify-content-between">
          <SelectJob label="Імпорт пропозицій" value="saveIds" />
          <SelectJob label="Імпорт статистики пропозицій" value="saveStat" />
          <SelectJob label="Імпорт статистики студентів" value="saveStud" />
          <SelectJob label="Всі завдання" value="saveAll" />
        </div>
        <hr className="my-4" />
        <button
          type="submit"
          className="btn btn-info btn-sm"
          onClick={handleClick}
        >
          Додати завдання
        </button>
      </div>
    </form>
  );
}

export default Forms;
