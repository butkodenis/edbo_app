/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import Select from './Input/Select';
import Radio from './Input/Radio';
import dictionary from '../dict';

function Form() {
  const { years, specialtys, qualifications, educationBases, tasks } =
    dictionary;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    //добавляем тектовые поля из справочника
    const sendData = {
      ...data,
      specialtyText: specialtys.find((item) => item.code == data.specialty)
        .name,
      qualificationText: qualifications.find(
        (item) => item.code == data.qualification,
      ).name,
      educationBaseText: educationBases.find(
        (item) => item.code == data.educationBase,
      ).name,
      taskText: tasks.find((item) => item.code == data.task).name,
    };

    console.log(sendData);
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
              value="saveStat"
              label="Імпорт пропозицій"
              register={register}
            />
          </div>
          <div className="col-lg">
            <Radio
              name="task"
              value="saveStat"
              label="Імпорт статистики пропозицій"
              register={register}
            />
          </div>
          <div className="col-lg">
            <Radio
              name="task"
              value="saveStud"
              label="Імпорт статистики студентів"
              register={register}
            />
          </div>
          <div className="col-lg">
            <Radio
              name="task"
              value="saveAll"
              label="Всі завдання"
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
