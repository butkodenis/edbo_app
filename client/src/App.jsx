import React, { useState } from 'react';
import Forms from './components/Forms/Form';
import TableTask from './components/Tables/Table';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    year: 2023,
    specialty: 221,
    qualification: 1,
    educationBase: 40,
    task: 'saveAll',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Проверяем, если поле - одно из числовых полей, то преобразуем значение в число
    if (
      ['year', 'specialty', 'qualification', 'educationBase'].includes(name)
    ) {
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    } else {
      // Иначе оставляем значение как строку
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="row">
        <data className="col-md-12">
          <Forms
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </data>
        <div className="col-sm">
          <TableTask />
        </div>
      </div>
    </div>
  );
}

export default App;
