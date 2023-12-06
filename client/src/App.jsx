import React, { useState, useEffect } from 'react';
import { Router, Route, Link, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Log from './pages/Log';
import Graphics from './pages/Grafic';

import LayOut from './components/Layout/Layout';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path="/:id/log" element={<Log />} />
        <Route path="graphics" element={<Graphics />} />
      </Route>
    </Routes>
  );
}

export default App;
