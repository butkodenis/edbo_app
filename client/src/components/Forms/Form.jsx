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

  const formData = {
    years: selectedYear,
    specialty: selectedSpecialty,
    qualification: selectedQualification,
    educationBase: selectedEducationBase,
    task: selectedJob,
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(formData);

    fetch('http://localhost:4040/task/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Успешно отправлено
          console.log('Данные успешно отправлены на сервер.');

          // Здесь можно обработать ответ от сервера, если он есть
          response.json().then((data) => {
            console.log('Ответ от сервера:', data);
          });
        } else {
          // Обработка ошибок при отправке данных на сервер
          console.error('Ошибка при отправке данных на сервер.');
        }
      })
      .catch((error) => {
        console.error('Произошла ошибка при отправке данных:', error);
      });
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
          <SelectJob
            label="Імпорт пропозицій"
            value="saveIds"
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
          />
          <SelectJob
            label="Імпорт статистики пропозицій"
            value="saveStat"
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
          />
          <SelectJob
            label="Імпорт статистики студентів"
            value="saveStud"
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
          />
          <SelectJob
            label="Всі завдання"
            value="saveAll"
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
          />
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
