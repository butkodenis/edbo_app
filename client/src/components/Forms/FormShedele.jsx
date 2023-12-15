import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function FormSchedule() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-2">
          <input type="number" id="hour" name="hour" min="0" max="23" value="12" />
        </div>
        <div className="col-2">
          <input type="number" id="minutes" name="minutes" min="0" max="59" value="30" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Отправить
      </button>
    </form>
  );
}

export default FormSchedule;
