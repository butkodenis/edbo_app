import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Log from './pages/Log';
import Graphics from './pages/Grafic';
import Schedule from './pages/Schedule';
import Backup from './pages/Backup';
import Info  from './pages/Info';

import LayOut from './components/Layout/Layout';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path="/:id/log" element={<Log />} />
        <Route path="graphics" element={<Graphics />} />
        <Route path="backup" element={<Backup />} />
        <Route path="info" element={<Info />} />
        <Route path="/:id/schedule" element={<Schedule />} />
      </Route>
    </Routes>
  );
}

export default App;
