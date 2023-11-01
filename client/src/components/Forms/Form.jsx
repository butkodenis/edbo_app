import React, { useState } from 'react';
import Select from './Input/Select';
import SelectJob from './Input/SelectJob';
import dictionary from '../dict';

function Forms() {
  const { years, specialty, qualification, educationBase } = dictionary;
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedSpecialty, setSelectedSpecialty] = useState('221');
  const [selectedQualification, setSelectedQualification] = useState('1');
  const [selectedEducationBase, setSelectedEducationBase] = useState('40');
  const [selectedJob, setSelectedJob] = useState('saveAll');

  const handleClick = (event) => {
    event.preventDefault();
    console.log('Selected year:', selectedYear);
    console.log('Selected Specialty:', selectedSpecialty);
    console.log('Selected Qualification:', selectedQualification);
    console.log('Selected Education Base:', selectedEducationBase);
    console.log('Selected Job:', selectedJob);
  };

  return (
    <form>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Select
              name="yearSelect"
              label="Оберіть рік"
              values={years}
              onChange={(event) => setSelectedYear(event.target.value)}
            />
          </div>
          <div className="col-lg-6">
            <Select
              name="specialtySelect"
              label="Оберіть спеціальність"
              values={specialty}
              onChange={(event) => setSelectedSpecialty(event.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Select
              name="qualificationySelect"
              label="Оберіть освітній рівень"
              values={qualification}
              onChange={(event) => setSelectedQualification(event.target.value)}
            />
          </div>
          <div className="col-lg-6">
            <Select
              name="seducationBaseSelect"
              label="Оберіть основу вступу"
              values={educationBase}
              onChange={(event) => setSelectedEducationBase(event.target.value)}
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
