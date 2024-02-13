import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import axios from 'axios';

import FormSchedule from '../components/Forms/FormShedele';

function Schedule() {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/${id}/shedule`);
      setScheduleData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const addFormSchedule = () => {
    // Получаем текущее состояние массива
    const currentScheduleData = [...scheduleData];

    // Создаем новый элемент
    const newElement = { timing: '00 00 * * *' };

    // Добавляем новый элемент к текущему состоянию массива
    currentScheduleData.push(newElement);

    // Обновляем состояние с новым массивом
    setScheduleData(currentScheduleData);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h4>виконати за розкладом</h4>
          <p>задача id : {id}</p>
          <button onClick={addFormSchedule} className="btn btn-outline-primary btn-sm mb-3">
            Додати розклад
          </button>
        </div>
      </div>
      <div className="row">
        {scheduleData ? (
          scheduleData.map((scheduleItem, index) => (
            <div key={index} className="col-xl-2 col-md-4 col-sm-4">
              <FormSchedule key={index} scheduleData={scheduleItem} fetchData={fetchData} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Schedule;
