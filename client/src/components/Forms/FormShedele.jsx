import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function FormSchedule() {
  // const { register, handleSubmit } = useForm();
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Выбранная опция: ${selectedOption}`);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="option"
          id="option1"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={() => setSelectedOption('option1')}
        />
        <label className="form-check-label" htmlFor="option1">
          Option 1
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="option"
          id="option2"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={() => setSelectedOption('option2')}
        />
        <label className="form-check-label" htmlFor="option2">
          Option 2
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="option"
          id="option3"
          value="option3"
          checked={selectedOption === 'option3'}
          onChange={() => setSelectedOption('option3')}
        />
        <label className="form-check-label" htmlFor="option3">
          Option 3
        </label>
      </div>

      {selectedOption === 'option1' && <div className="mt-3">Текст для первой опции</div>}
      {selectedOption === 'option2' && <div className="mt-3">Текст для второй опции</div>}
      {selectedOption === 'option3' && <div className="mt-3">Текст для третьей опции</div>}

      <button type="submit" className="btn btn-primary mt-3">
        Отправить
      </button>
    </form>
  );
}

export default FormSchedule;
