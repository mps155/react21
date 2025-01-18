import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import Jogo from './Jogo';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/jogo" element={<Jogo />} />
          </Routes>
      </Router>
  );
};

export default App;
