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
  } = card;

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
      console.error('Помилка iмпорту задачи:', error.response.data.error);
    } finally {
      setLoading(false); // Сбрасываем состояние загрузки после завершения запроса
      fetchData();
    }
  };

  return (
    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4  col-md-6" key={_id}>
      <div className="card  text-bg-light mb-4">
        <div className="card-header">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleDelete}
          />
        </div>

        <div className="card-body">
          <p className="">
            {taskText} {year}
          </p>
          <p className="">ID: {_id}</p>
          <p className="">
            <strong>
              {speciality} {specialityText}
            </strong>
          </p>

          <p className="">
            ОР -<strong> {qualificationText}</strong>{' '}
          </p>
          <p className="">ОВ - {educationBaseText}</p>
          <p className=""> time: {}</p>
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
