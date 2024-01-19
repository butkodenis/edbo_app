import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import axios from 'axios';

import FormSchedule from '../components/Forms/FormShedele';

function Schedule() {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/task/${id}/shedule`);
        setScheduleData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h4>виконувати за розкладом</h4>
          <p>задача id : {id}</p>
        </div>
      </div>
      <div className="row">
        {scheduleData ? (
          scheduleData.map((scheduleItem, index) => (
            <div className="col-2">
              <FormSchedule key={index} scheduleData={scheduleItem} />
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
