// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function LayOut() {
  return (
    <div className="conteiner">
      <header className="d-flex justify-content-center py-3 mb-4 border-bottom  bg-light">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/log" className="nav-link px-2 ">
              Log
            </Link>
          </li>
          <li>
            <Link to="/graphics" className="nav-link px-2">
              Графіки
            </Link>
          </li>
        </ul>
      </header>

      <Outlet />
    </div>
  );
}

export default LayOut;
