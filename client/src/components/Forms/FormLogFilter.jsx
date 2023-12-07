import React from 'react';
import { useForm } from 'react-hook-form';

import Input from './Input/Input';

function FormLogFilter({ onFormSubmit, onFormReset }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Вызываем функцию обратного вызова и передаем данные в родительский компонент
    onFormSubmit(data);
  };

  const handleReset = () => {
    // Сбросить значения формы
    reset();
    // Вызвать функцию обратного вызова для сброса в родительском компоненте
    onFormReset();
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <h5>параметри фільтру</h5>
      <div className="row g-3">
        <div className="col-md-2">
          <Input name="date" label="Оберіть дату" register={register} />
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <button type="submit" className="btn btn-info btn-sm mb-1">
            <i className="bi bi-filter"></i>
          </button>
          <button type="button" className="btn btn-success btn-sm ms-2 mb-1 " onClick={handleReset}>
            <i className="bi bi-x-square"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormLogFilter;
