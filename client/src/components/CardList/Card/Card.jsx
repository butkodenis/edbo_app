/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Card({ card, fetchData }) {
  const [loading, setLoading] = useState(false); // Состояние для отслеживания статуса загрузки

  const {
    id,
    year,
    speciality,
    specialityText,
    qualificationText,
    educationBaseText,
    taskText,
    timeCompleted,
    timeCreation,
    status,
  } = card;

  const formattedTimeCreation = new Date(timeCreation).toLocaleString('ru-RU');
  const formattedTimeCompleted = timeCompleted
    ? new Date(timeCompleted).toLocaleString('ru-RU')
    : '';

  const handleDelete = async () => {
    try {
      // Отправка запроса на удаление
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/task/delete`, {
        data: { id },
      });

      console.log(`Задача ID ${id} видалена`);
      fetchData();
    } catch (error) {
      // Обработка ошибок при удалении
      console.error('Error deleting task:', error.message);
    }
  };

  const handleImport = async () => {
    try {
      setLoading(true); // Устанавливаем состояние загрузки в true при начале запроса
      // Отправка POST-запроса на /task/:id/run
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/task/${id}/run`);
      const time = response.data;
    } catch (error) {
      // Обработка ошибок при импорте
      console.error('Помилка iмпорту задачи:', error.response.data.error);
      if (error.response.data.error === 'Невірні параметри запиту') {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false); // Сбрасываем состояние загрузки после завершения запроса
      fetchData();
    }
  };

  return (
    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4  col-md-6" key={id}>
      <div
        className={`card ${status === 'Помилка' ? 'text-white bg-danger' : 'text-bg-light'} mb-4`}
      >
        <div className="card-header d-flex justify-content-between align-items-center">
          <button type="button" className="btn-close " aria-label="Close" onClick={handleDelete} />
          <p className="mb-0">{status}</p>
        </div>

        <div className="card-body">
          <p className="mb-0">
            {taskText} <strong>{year}</strong>
          </p>

          <p className="mb-0">
            <strong>
              {speciality} {specialityText}
            </strong>
          </p>

          <p className="mb-0">
            ОР -<strong> {qualificationText}</strong>{' '}
          </p>
          <p className="mb-0"> ОВ - {educationBaseText}</p>
          <p className="mb-0"> Створено: {formattedTimeCreation}</p>
          <p className="mb-0"> Виконано: {formattedTimeCompleted}</p>
          <p className="mb-0">ID: {id}</p>
        </div>
        <div className="card-footer  d-flex justify-content-between align-items-center">
          {/* Используем тернарный оператор для отображения spinner, если loading === true */}
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button
              type="button"
              className={`btn  ${
                status === 'Помилка' ? 'btn btn-light' : 'btn-outline-primary'
              } btn-sm mr-2`}
              onClick={handleImport}
            >
              Імпорт
            </button>
          )}
          <div className={`d-flex justify-content-end ${loading ? 'd-none' : ''}`}>
            <Link to={`/${id}/log`}>
              <button type="button" className="btn btn-outline-primary btn-sm mx-2">
                <i className="bi bi-journal-text" />
              </button>
            </Link>
            <Link to={`/${id}/schedule`}>
              <button type="button" className="btn btn-outline-primary btn-sm">
                <i className="bi bi-clock-history " />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
