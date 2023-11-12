import React from 'react';
import Card from './Card/Card';

const cards = [
  {
    title: 'Card 1',
    subtitle: 'Subtitle 1',
    text: 'This is some text for Card 1. It can contain additional details or information.',
    image: 'https://placekitten.com/200/300', // Example image URL
    link: 'https://example.com/card1',
  },
  {
    title: 'Card 2',
    subtitle: 'Subtitle 2',
    text: 'This is some text for Card 2. It can contain additional details or information.',
    image: 'https://placekitten.com/201/301', // Example image URL
    link: 'https://example.com/card2',
  },
  {
    title: 'Card 3',
    subtitle: 'Subtitle 3',
    text: 'This is some text for Card 3. It can contain additional details or information.',
    image: 'https://placekitten.com/202/302', // Example image URL
    link: 'https://example.com/card3',
  },
];

function CardList({ cardsData }) {
  return (
    <div className="card-list mt-4 mb-4">
      <div className="container">
        <div className="row">
          {cardsData.map((card) => (
            <Card
              title={card.specialtyText}
              subtitle={card.qualificationText}
              text={card.educationBaseText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardList;
