import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import axios from 'axios';
import FormLogFilter from '../Forms/FormLogFilter';
import ButtonLogDel from '../Button/ButtonLogDel';

function TableTask() {
  const { id } = useParams();
  const [tableData, setTableData] = useState(null);
  const [filteredData, setFilteredData] = useState(null); // Добавлен новый state для отфильтрованных данных

  const handleFormData = (formData) => {
    // console.log('Данные из формы:', formData);

    // Применяем фильтрацию к данным при получении новых данных из формы
    filterData(formData);
  };

  const handleFormReset = () => {
    console.log('Форма сброшена');

    // Сбрасываем фильтрацию при сбросе формы
    setFilteredData(tableData);
  };

  const filterData = (formData) => {
    // Применяем фильтрацию к данным
    const { date } = formData;

    const filtered = tableData.filter((row) => {
      if (date !== '') {
        // Фильтрация только по дате
        return new Date(row.timeCreation) > new Date(date);
      }
      return true; // Возвращаем true, чтобы сохранить все записи, если нет фильтрации
    });

    // Обновляем отфильтрованные данные
    setFilteredData(filtered);
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4040/task/${id}/log`);
      setTableData(response.data);
      setFilteredData(response.data); // Инициализируем отфильтрованные данные при получении данных
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <div>
      <FormLogFilter onFormSubmit={handleFormData} onFormReset={handleFormReset} />

      <table className="table table-hover table-sm ">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Тип завдання</th>
            <th scope="col">Опис</th>
            <th scope="col">Час </th>
            <th scope="col">Статус</th>
            <th scope="col">id імпорту</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((row) => (
              <tr key={row._id} className={row.status === 'Помилка' ? 'table-danger' : ''}>
                <td>{row._id}</td>
                <td>{row.taskText}</td>
                <td>{row.info}</td>
                <td>{new Date(row.timeCreation).toLocaleString('ru-RU')}</td>
                <td>{row.status}</td>
                <td>{row.idJob}</td>
                <td>
                  <ButtonLogDel taskId={row._id} jobId={row.idJob} />
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot className="">
          <Link to="/" className="nav-link px-2">
            <button type="button" className="btn btn-info btn-sm ms-2 mt-1 w-25">
              <i className="bi bi-house" />
            </button>
          </Link>
        </tfoot>
      </table>
    </div>
  );
}

export default TableTask;
