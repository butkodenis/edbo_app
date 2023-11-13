/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

function Card({ card, fetchData }) {
  const {
    _id,
    specialty,
    specialtyText,
    qualificationText,
    educationBaseText,
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

  return (
    <div className="col-lg-4 col-md-4" key={_id}>
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
          <p className="card-text">ID: {_id}</p>
          <p className="card-text">
            <strong>
              {specialty} {specialtyText}
            </strong>
          </p>
          <p className="card-text">
            {qualificationText} {educationBaseText}
          </p>
        </div>
        <div className="card-footer text-body-secondary">
          <button type="button" className="btn btn-outline-primary btn-sm">
            Імпорт
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
