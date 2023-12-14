import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Schedule() {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h3> плнировщик задач</h3>
          <p>{id}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link to="/" className="nav-link px-2 ">
            <button type="button" className="btn btn-info btn-sm ms-2 mt-1">
              <i className="bi bi-house" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
