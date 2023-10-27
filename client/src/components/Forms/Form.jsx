import React from 'react';
import Select from './Input/Select';
import dictionary from '../dict';

function Forms() {
  const { years, specialty, qualification, educationBase } = dictionary;
  return (
    <form>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Select name="yearSelect" label="Оберіть рік" values={years} />
          </div>
          <div className="col-lg-6">
            <Select
              name="specialtySelect"
              label="Оберіть спеціальність"
              values={specialty}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Select
              name="qualificationySelect"
              label="Оберіть освітній рівень"
              values={qualification}
            />
          </div>
          <div className="col-lg-6">
            <Select
              name="seducationBaseSelect"
              label="Оберіть основу вступу"
              values={educationBase}
            />
          </div>
        </div>
        <hr className="my-4" />
        <hr className="my-4" />
        <button type="submit" className="btn btn-info btn-sm">
          Додати завдання
        </button>
      </div>
    </form>
  );
}

export default Forms;
