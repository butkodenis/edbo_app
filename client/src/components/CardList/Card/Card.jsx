/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

function Card({ card, fetchData }) {
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
      console.log(`Task with ID ${_id} deleted successfully.`);
      fetchData();
    } catch (error) {
      // Обработка ошибок при удалении
      console.error('Error deleting task:', error.message);
    }
  };

  const handleImport = async () => {
    try {
      // Отправка POST-запроса на /task/:id/run
      const response = await axios.post(
        `http://localhost:4040/task/${_id}/run`,
      );
      const time = response.data;
      // Обработка ответа, если нужно
      console.log('Import response:', time);

      // Дополнительные действия после успешного импорта, если нужно
    } catch (error) {
      // Обработка ошибок при импорте
      console.error('Error importing task:', error.message);
    }
  };

  return (
    <div className="col-lg-3 col-md-3" key={_id}>
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
          <p className="">
            {taskText} <strong>{year}</strong>
          </p>

          <p className="">
            <strong>
              {speciality} {specialityText}
            </strong>
          </p>

          <p className="">
            ОР -<strong> {qualificationText}</strong>{' '}
          </p>
          <p className="">ОВ - {educationBaseText}</p>
          <p className=""> Створено: {formattedTimeCreation}</p>
          <p className=""> Виконано: {formattedTimeCompleted}</p>
          <p className="">ID: {_id}</p>
        </div>
        <div className="card-footer text-body-secondary">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={handleImport}
          >
            Імпорт
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
