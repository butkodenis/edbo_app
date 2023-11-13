import React from 'react';
import axios from 'axios';

function Card({ id, fetchData }) {
  const handleDelete = async () => {
    try {
      // Отправка запроса на удаление с использованием Axios
      await axios.delete(`http://localhost:4040/task/delete`, {
        data: { id },
      });

      // Дополнительные действия после успешного удаления, если нужно
      console.log(`Task with ID ${id} deleted successfully.`);
      fetchData();
    } catch (error) {
      // Обработка ошибок при удалении
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div className="col-lg-3 col-md-4" key={id}>
      <div className="card  text-bg-light mb-4" key={id}>
        <div className="card-header">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleDelete}
          />
        </div>

        <div className="card-body">
          <p className="card-text">ID: {id}</p>
          <p className="card-text">{id}</p>
          <p className="card-text">{id}</p>
        </div>
        <div className="card-footer text-body-secondary">
          <button type="button" className="btn btn-outline-primary btn-sm">
            Danger
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
