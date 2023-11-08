/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Select from './Input/Select';
import SelectComponent from './Input/SelectComponent';
import SelectJob from './Input/SelectJob';
import dictionary from '../dict';

function Forms() {
  const { years, specialty, qualification, educationBase } = dictionary;

  return (
    <form>
      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg">
            <Select
              name="specialtySelect"
              label="Оберіть спеціальність"
              options={specialty}
              values={specialty}
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
