import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Forms/Form';
import CardList from '../components/CardList/CardList';

function Home() {
  const [cardsData, setCardsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/all`);
      setCardsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid ">
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

export default Home;
