/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import Select from './Input/Select';
import Radio from './Input/Radio';
import dictionary from '../dict';
import axios from 'axios';

function Form() {
  const { years, specialtys, qualifications, educationBases, tasks } =
    dictionary;
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // добавляем тектовые поля из справочника
    const sendData = {
      ...data,
      year: Number(data.year),
      specialty: Number(data.specialty),
      educationBase: Number(data.educationBase),
      qualification: Number(data.qualification),

      // Добавляем текстовые поля из справочника
      specialtyText: specialtys.find((item) => item.code == data.specialty)
        .name,
      qualificationText: qualifications.find(
        (item) => item.code == data.qualification,
      ).name,
      educationBaseText: educationBases.find(
        (item) => item.code == data.educationBase,
      ).name,
      taskText: tasks.find((item) => item.code === data.task).name,
    };

    console.log(sendData);
    try {
      const response = await axios.post(
        'http://localhost:4040/task/create',
        sendData,
      );
      console.log('Ответ сервера:', response.data);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg">
            <Select
              name="year"
              options={years}
              label="Оберіть рік"
              register={register}
            />
          </div>
          <div className="col-lg">
            <Select
              name="specialty"
              options={specialtys}
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
            <Radio
              name="task"
              value={tasks[0].code}
              label={tasks[0].name}
              register={register}
            />
          </div>
          <div className="col-lg">
            <Radio
              name="task"
              value={tasks[1].code}
              label={tasks[1].name}
              register={register}
            />
          </div>
          <div className="col-lg">
            <Radio
              name="task"
              value={tasks[2].code}
              label={tasks[2].name}
              register={register}
            />
          </div>
          <div className="col-lg">
            <Radio
              name="task"
              value={tasks[3].code}
              label={tasks[3].name}
              register={register}
            />
          </div>
        </div>
        <hr className="my-4" />
        <button type="submit" className="btn btn-primary">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default Form;
