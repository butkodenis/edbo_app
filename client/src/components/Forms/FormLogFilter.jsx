import React from 'react';
import { useForm } from 'react-hook-form';

import Select from './Input/Select';
import Input from './Input/Input';

function FormLogFilter({ onFormSubmit, onFormReset }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    //console.log('Данные из формы:', data);
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
      <div className="row g-3">
        <div className="col-2">
          <Select
            name="status"
            options={[
              { code: 'Помилка', name: 'Помилка' },
              { code: 'Виконано', name: 'Виконано' },
            ]}
            label="Оберіть статус"
            register={register}
          />
        </div>
        <div className="col-md-2">
          <Input name="date" label="Оберіть дату" register={register} />
        </div>

        <div className="col-md-2 ">
          <button type="submit" className="btn btn-primary btn-sm ">
            фільтрувати
          </button>
        </div>
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleReset}
          >
            Скинути
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormLogFilter;
