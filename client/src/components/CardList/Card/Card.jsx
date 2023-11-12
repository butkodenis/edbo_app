import React from 'react';

function Card({ id, title, subtitle, text }) {
  return (
    <div className="col-lg-3">
      <div className="card" key={id}>
        <button type="button" class="btn-close" aria-label="Close"></button>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
          <p className="card-text">{id}</p>
          <button type="button" class="btn btn-primary btn-sm">
            Danger
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
