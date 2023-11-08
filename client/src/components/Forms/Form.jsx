/* eslint-disable no-console */
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
    year: Number(selectedYear),
    specialty: Number(selectedSpecialty),
    specialtyText: specialty.find((item) => item.code == selectedSpecialty)
      .name,
    qualification: Number(selectedQualification),
    qualificationText: qualification.find(
      (item) => item.code == selectedQualification,
    ).name,
    educationBase: Number(selectedEducationBase),
    educationBaseText: educationBase.find(
      (item) => item.code == selectedEducationBase,
    ).name,
    task: selectedJob,
  };

  const handleClick = (event) => {
    event.preventDefault();
    //console.log(formData);
    fetch('http://localhost:4040/task/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        // После выполнения запроса, мы получаем объект ответа (response).
        if (response.ok) {
          // Если статус ответа успешный (код 200), разбираем ответ в формате JSON.
          return response.json();
        }
        throw new Error('Ошибка при выполнении запроса');
      })
      .then((data) => {
        // Обработка успешного ответа (уже в формате JSON).
        console.log('Успешный ответ от сервера:', data);
      })
      .catch((error) => {
        // Обработка ошибок, если что-то пошло не так.
        console.error('Ошибка:', error);
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
