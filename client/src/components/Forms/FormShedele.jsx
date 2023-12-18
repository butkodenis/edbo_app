import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, Link } from 'react-router-dom';

import axios from 'axios';

function FormSchedule({ scheduleData }) {
  const { id } = useParams();
  // если нет расписания тогда подствить значания поумолчанию
  if (!scheduleData || !scheduleData.length) {
    scheduleData = [{ timing: '00 00 * * *' }];
  }
  const [{ timing, _id }] = scheduleData;

  console.log(timing, _id);
  // преобразуем из формата cron в формат формы
  const [minute, hour, dayOfMonth, month, dayOfWeek] = timing.split(' ');

  const dayNames = dayOfWeek.split(',').map((day) => {
    switch (day) {
      case '1':
        return 'Понеділок';
      case '2':
        return 'Вівторок';
      case '3':
        return 'Середа';
      case '4':
        return 'Четвер';
      case '5':
        return 'П’ятниця';
      case '6':
        return 'Субота';
      case '7':
        return 'Неділя';
      default:
    }
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      time: `${hour}:${minute}`,
      days: dayNames,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    // преобразуем данные из формы в формат node-schedule
    const { time, days } = data;
    const [hours, minutes] = time.split(':');
    const dayNumber = days
      .map((day) => {
        switch (day) {
          case 'Понеділок':
            return 1;
          case 'Вівторок':
            return 2;
          case 'Середа':
            return 3;
          case 'Четвер':
            return 4;
          case 'П’ятниця':
            return 5;
          case 'Субота':
            return 6;
          case 'Неділя':
            return 7;
          default:
        }
      })
      .sort();

    const shedule = `${minutes} ${hours} * * ${dayNumber}`;
    console.log(shedule, id, _id);

    const apiUrl = _id
      ? `http://localhost:4040/task/${id}/shedule/${_id}`
      : `http://localhost:4040/task/${id}/shedule`;

    const requestData = {
      timing: shedule,
    };

    try {
      if (_id) {
        // If _id exists, make a PUT request
        await axios.put(apiUrl, requestData);
      } else {
        // If _id doesn't exist, make a POST request
        await axios.post(apiUrl, requestData);
      }
    } catch (error) {
      // Handle errors or provide feedback to the user
      console.error('ошибка  при обновлении расписания', error);
    }
  };

  const daysOfWeek = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота', 'Неділя'];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formSchedule border p-3 text-bg-light rounded "
    >
      <div className="mb-3 d-flex align-items-center">
        <input type="time" className="form-control me-3" {...register('time')} />
        {daysOfWeek.map((day, index) => (
          <div className="form-check me-3" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={day}
              id={`day-${index}`}
              {...register('days')}
            />
            <label className="form-check-label" htmlFor={`day-${index}`}>
              {day}
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-outline-primary btn-sm">
        Змінити розклад
      </button>
    </form>
  );
}

export default FormSchedule;
