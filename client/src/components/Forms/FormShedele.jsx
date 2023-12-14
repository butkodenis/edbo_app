import React from 'react';
import { useForm } from 'react-hook-form';

import Radio from './Input/Radio';

function FormSchedule() {
  const { register, handleSubmit, reset } = useForm();
  return (
    <form>
      <h5>параметри</h5>
      <Radio name="day" value={'day'} label={'Ежеденевно'} register={register} />
      <Radio name="dayOfWeek" value={'dayOfWeek'} label={'По дням недели '} register={register} />
      <Radio name="hour" value={'hour'} label={'Каждые Х часа'} register={register} />
    </form>
  );
}

export default FormSchedule;
