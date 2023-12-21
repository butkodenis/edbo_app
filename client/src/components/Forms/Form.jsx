/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Select from './Input/Select';
import Radio from './Input/Radio';
import dictionary from '../dict';

function Form({ fetchData }) {
  const { years, specialitys, qualifications, educationBases, tasks } = dictionary;
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // добавляем тектовые поля из справочника
    const sendData = {
      ...data,
      year: Number(data.year),
      speciality: Number(data.speciality),
      educationBase: Number(data.educationBase),
      qualification: Number(data.qualification),

      // Добавляем текстовые поля из справочника
      specialityText: specialitys.find((item) => item.code == data.speciality).name,
      qualificationText: qualifications.find((item) => item.code == data.qualification).name,
      educationBaseText: educationBases.find((item) => item.code == data.educationBase).name,
      taskText: tasks.find((item) => item.code === data.task).name,
    };

    console.log(sendData);
    // Отправка POST-запроса
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/task/create`, sendData);
      console.log('Ответ сервера:', response.data);
      fetchData();
    } catch (error) {
      if (error.response) {
        // Запрос выполнен, и сервер вернул статус код отличный от 2xx

        console.error('Данные ошибки:', error.response.data);
      } else if (error.request) {
        // Запрос отправлен, но нет ответа
        console.error('Ошибка при получении ответа от сервера');
      } else {
        // Что-то пошло не так при настройке запроса
        console.error('Ошибка при настройке запроса:', error.message);
      }
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg">
            <Select name="year" options={years} label="Оберіть рік" register={register} />
          </div>
          <div className="col-lg">
            <Select
              name="speciality"
              options={specialitys}
              label="Оберіть спеціальність"
              register={register}
            />
          </div>
          <div className="col-lg">
            <Select
              name="qualification"
              options={qualifications}
              label="Оберіть освітній рівень"
              register={register}
            />
          </div>
          <div className="col-lg">
            <Select
              name="educationBase"
              options={educationBases}
              label="Оберіть основу вступу"
              register={register}
            />
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-lg">
            <Radio name="task" value={tasks[0].code} label={tasks[0].name} register={register} />
          </div>
          <div className="col-lg">
            <Radio name="task" value={tasks[1].code} label={tasks[1].name} register={register} />
          </div>
          <div className="col-lg">
            <Radio name="task" value={tasks[2].code} label={tasks[2].name} register={register} />
          </div>
          <div className="col-lg">
            <Radio
              name="task"
              value={tasks[3].code}
              label={tasks[3].name}
              register={register}
              checked={true}
            />
          </div>
        </div>
        <hr className="my-4" />
        <button type="submit" className="btn btn-primary">
          Додати імпорт
        </button>
      </form>
    </div>
  );
}

export default Form;
