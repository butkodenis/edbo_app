import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, Link } from 'react-router-dom';

import axios from 'axios';

function FormSchedule({ scheduleData, fetchData }) {
  const { id } = useParams();
  console.log(scheduleData);

  const { timing, _id } = scheduleData || { timing: '00 00 * * *' };

  console.log(timing, 'id cron:', _id);
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
    console.log(data, new Date());
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

    console.log(shedule, id, _id, dayNumber);

    const apiUrl = _id
      ? `${import.meta.env.VITE_BASE_URL}/api/task/${id}/shedule/${_id}`
      : `${import.meta.env.VITE_BASE_URL}/api/task/${id}/shedule`;

    const requestData = {
      timing: shedule,
    };

    try {
      console.log(_id);
      if (_id) {
        if (dayNumber.length > 0) {
          // Если _id существует и dayNumber не пуст, выполняем PUT-запросt
          await axios.put(apiUrl, requestData);
          await fetchData();
        } else {
          // Если _id существует и dayNumber пуст, выполняем DELETE-запрос
          await axios.delete(apiUrl);
          await fetchData();
        }
      } else {
        // Если _id не существует и dayNumber не пуст, выполняем POST-запрос
        await axios.post(apiUrl, requestData);
        await fetchData();
      }
    } catch (error) {
      console.error('ошибка  при обновлении расписания', error);
    }
  };

  const deleteSchedule = async () => {
    const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/task/${id}/shedule/${_id}`;

    try {
      await axios.delete(apiUrl);
      await fetchData();
      // Optionally, you can reset the form or perform other actions after deletion.
    } catch (error) {
      console.error('Error deleting schedule', error);
    }
  };

  const daysOfWeek = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота', 'Неділя'];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formSchedule border p-3 text-bg-light rounded d-flex flex-column align-items-center"
    >
      <div className="mb-3">
        <input type="time" className="form-control mb-3" {...register('time')} />

        {daysOfWeek.map((day, index) => (
          <div className="form-check mb-3" key={index}>
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
      <div className="mb-3 d-flex flex-column align-items-center w-100">
        <button type="submit" className="btn btn-outline-primary btn-sm mb-2 w-100">
          {_id ? 'Змінити' : 'Додати'}
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm w-100"
          onClick={deleteSchedule}
        >
          Видалити
        </button>
      </div>
    </form>
  );
}

export default FormSchedule;
