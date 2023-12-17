import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, Link } from 'react-router-dom';

function FormSchedule() {
  const { id } = useParams();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      time: '12:30',
      days: ['Середа', 'П’ятниця', 'Понеділок'],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
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
    console.log(shedule, id);
  };

  const daysOfWeek = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота', 'Неділя'];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Час</label>
        <input type="time" className="form-control w-25" {...register('time')} />
      </div>
      <div className="mb-3">
        {daysOfWeek.map((day, index) => (
          <div className="form-check" key={index}>
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
      <button type="submit" className="btn btn-primary">
        Надіслати
      </button>
    </form>
  );
}

export default FormSchedule;
