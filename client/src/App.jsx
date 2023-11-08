import React from 'react';
import Forms from './components/Forms/Form';
import TableTask from './components/Tables/Table';
import './App.css';

function App() {
  return (
    <div className="conteiner ">
      <div className="row">
        <div className="col-12">
          <Forms />
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
