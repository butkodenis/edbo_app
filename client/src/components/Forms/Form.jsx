/* eslint-disable no-console */
import React, { useState } from 'react';
import dictionary from '../dict';

const Form = function () {
  const { years, specialtys } = dictionary;
  const renderSelectOptions = (items) =>
    items.map((item) => (
      <option key={item.code} value={item.code}>
        {item.name}
      </option>
    ));

  return (
    <form>
      <div className="container">
        <div className="row">
          <div className="col-lg">
            <label htmlFor="year" className="form-label">
              <strong>выберити год</strong>
            </label>
            <select id="year" className="form-select">
              {renderSelectOptions(years)}
            </select>
          </div>
          <div className="col-lg">
            <label htmlFor="specialty" className="form-label">
              <strong>выберити specialty</strong>
            </label>
            <select id="specialty" className="form-select">
              {renderSelectOptions(specialtys)}
            </select>
          </div>
        </div>
      </div>
      <button type="submit">создать задачу</button>
    </form>
  );
};

export default Form;
