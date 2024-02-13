import React, { useState } from 'react';

import axios from 'axios';

function ButtonLogDel({ logId, updateData }) {
  const [loading, setLoading] = useState(false); // Состояние для отслеживания статуса загрузки

  const handleClick = async () => {
    setLoading(true);

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/log/${logId}`);
      console.log(`Данные удалены успешно ${logId}`);

      // Вызываем функцию обновления данных
      updateData();
    } catch (error) {
      console.error('Error deleting log:', error);
    } finally {
      setLoading(false); // Сбрасываем состояние загрузки после завершения запроса
    }
  };

  return (
    <div>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleClick}>
          <i className="bi bi-trash" />
        </button>
      )}
    </div>
  );
}

export default ButtonLogDel;
