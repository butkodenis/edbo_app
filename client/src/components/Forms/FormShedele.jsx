import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

function FormSchedule() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      time: '12:30',
      days: ['Середа', 'П’ятниця'],
    },
  });
  const onSubmit = (data) => console.log(data);

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
