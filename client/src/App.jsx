import React from 'react';
import Form from './components/Forms/Form';
import TableTask from './components/Tables/Table';
import './App.css';

function App() {
  return (
    <div className="conteiner ">
      <div className="row">
        <div className="col-12">
          <Form />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <TableTask />
        </div>
      </div>
    </div>
  );
}

export default App;
