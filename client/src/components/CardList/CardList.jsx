/* eslint-disable react/prop-types */
import React from 'react';
import Card from './Card/Card';

function CardList({ cardsData, fetchData }) {
  return (
    <div className="card-list mt-4 mb-4">
      <div className="container-fluid">
        <div className="row">
          {cardsData.map((card) => (
            <Card key={card.id} card={card} fetchData={fetchData} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardList;
