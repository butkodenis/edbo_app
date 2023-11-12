import React from 'react';
import axios from 'axios';

function Card({ id, title, subtitle, text, fetchData }) {
  const handleDelete = async () => {
    try {
      // Отправка запроса на удаление с использованием Axios
      await axios.delete(`http://localhost:4040/task/delete`, { data: { id } });

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
          Featured
        </div>

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
          <p className="card-text">{id}</p>
          <button type="button" className="btn btn-primary btn-sm">
            Danger
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
