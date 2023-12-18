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
        const response = await axios.get(`http://localhost:4040/task/${id}/shedule`);
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
          <p>{id}</p>
        </div>
        {scheduleData ? <FormSchedule scheduleData={scheduleData} /> : <p>Loading...</p>}
      </div>
      <div className="row">
        <div className="col">
          <Link to="/" className="nav-link px-2 ">
            <button type="button" className="btn btn-info btn-sm ms-2 mt-1">
              <i className="bi bi-house" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
