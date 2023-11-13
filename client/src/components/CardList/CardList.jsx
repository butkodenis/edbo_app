import React from 'react';
import Card from './Card/Card';

function CardList({ cardsData, fetchData }) {
  return (
    <div className="card-list mt-4 mb-4">
      <div className="container">
        <div className="row">
          {cardsData.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              specialty={card.specialty}
              specialtyText={card.specialtyText}
              qualificationText={card.qualificationText}
              educationBaseText={card.educationBaseText}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardList;
