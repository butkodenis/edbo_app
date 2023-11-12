import React from 'react';

function Card({ title, subtitle, text }) {
  return (
    <div className="col-lg-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
