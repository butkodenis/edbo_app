import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Forms/Form';
import CardList from './components/CardList/CardList';

import './App.css';

function App() {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4040/task/all'); // Update the URL to match your server endpoint
      setTableData(response.data);
      console.log(tableData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="conteiner ">
      <div className="row">
        <div className="col-12">
          <Form fetchData={fetchData} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <CardList />
        </div>
      </div>
    </div>
  );
}

export default App;
