/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

function Card({ card, fetchData }) {
  const [loading, setLoading] = React.useState(false); // Состояние для отслеживания статуса загрузки

  const {
    _id,
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
  const formattedTimeCompleted = new Date(timeCompleted).toLocaleString(
    'ru-RU',
  );

  const handleDelete = async () => {
    try {
      // Отправка запроса на удаление с использованием Axios
      await axios.delete(`http://localhost:4040/task/delete`, {
        data: { id: _id },
      });

      // Дополнительные действия после успешного удаления, если нужно
      console.log(`Задача ID ${_id} видалена`);
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
      const response = await axios.post(
        `http://localhost:4040/task/${_id}/run`,
      );
      const time = response.data;

      console.log('Import response:', time);
    } catch (error) {
      // Обработка ошибок при импорте
      console.error('Помилка iмпорту задачи:', error.response.data.error);
    } finally {
      setLoading(false); // Сбрасываем состояние загрузки после завершения запроса
      fetchData();
    }
  };

  return (
    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4  col-md-6" key={_id}>
      <div className="card  text-bg-light mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleDelete}
          />
          <p className="mb-0">{status}</p>
        </div>

        <div className="card-body">
          <p className="mb-1">
            {taskText} <strong>{year}</strong>
          </p>

          <p className="mb-1">
            <strong>
              {speciality} {specialityText}
            </strong>
          </p>

          <p className="mb-1">
            ОР -<strong> {qualificationText}</strong>{' '}
          </p>
          <p className="mb-1"> ОВ - {educationBaseText}</p>
          <p className="mb-1"> Створено: {formattedTimeCreation}</p>
          <p className="mb-1"> Виконано: {formattedTimeCompleted}</p>
          <p className="mb-1">ID: {_id}</p>
        </div>
        <div className="card-footer text-body-secondary">
          {/* Используем тернарный оператор для отображения spinner, если loading === true */}
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={handleImport}
            >
              Імпорт
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
