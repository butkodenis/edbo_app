/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import Select from './Input/Select';
import dictionary from '../dict';

function Form() {
  const { years, specialty, qualification, educationBase } = dictionary;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6">
            <Select
              name="year"
              options={years}
              label="Оберіть рік"
              register={register}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="select1" className="form-label">
            Выберите опцию 1:
          </label>
          <select id="select1" className="form-select" {...register('select1')}>
            <option value="">Выберите...</option>
            <option value="option1">Опция 1</option>
            <option value="option2">Опция 2</option>
            <option value="option3">Опция 3</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="select2" className="form-label">
            Выберите опцию 2:
          </label>
          <select id="select2" className="form-select" {...register('select2')}>
            <option value="option4">Опция 4</option>
            <option value="option5">Опция 5</option>
            <option value="option6">Опция 6</option>
          </select>
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              type="radio"
              id="radio1"
              className="form-check-input"
              value="radioOption1"
              {...register('radioOption')}
            />
            <label htmlFor="radio1" className="form-check-label">
              Радио опция 1
            </label>
          </div>
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              type="radio"
              id="radio2"
              className="form-check-input"
              value="radioOption2"
              {...register('radioOption')}
            />
            <label htmlFor="radio2" className="form-check-label">
              Радио опция 2
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default Form;
