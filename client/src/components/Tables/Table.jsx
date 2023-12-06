import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import FormLogFilter from '../Forms/FormLogFilter';

function TableTask() {
  const { id } = useParams();
  const [tableData, setTableData] = useState(null);

  const handleFormData = (formData) => {
    console.log('Данные из формы:', formData);
  };

  const handleFormReset = () => {
    console.log('Форма сброшена');
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4040/task/${id}/log`);
      setTableData(response.data);
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
      <FormLogFilter
        onFormSubmit={handleFormData}
        onFormReset={handleFormReset}
      />

      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Тип завдання</th>
            <th scope="col">Завдання</th>
            <th scope="col">Час ост. виконання</th>
            <th scope="col">Статутс</th>
            <th scope="col">Операция</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((row) => (
              <tr
                key={row._id}
                className={row.status === 'Помилка' ? 'table-danger' : ''}
              >
                <td>{row._id}</td>
                <td>{row.taskText}</td>
                <td>{row.info}</td>
                <td>{row.timeCreation}</td>
                <td>{row.status}</td>
                <td>{row.idJob}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableTask;
