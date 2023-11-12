import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Forms/Form';
import CardList from './components/CardList/CardList';

import './App.css';

function App() {
  const [cardsData, setCardsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4040/task/all');
      setCardsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(cardsData);
  }, [cardsData]); // This useEffect will run whenever cardData changes

  return (
    <div className="conteiner ">
      <div className="row">
        <div className="col-12">
          <Form fetchData={fetchData} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <CardList cardsData={cardsData} fetchData={fetchData} />
        </div>
      </div>
    </div>
  );
}

export default App;
