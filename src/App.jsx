import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ShowDetails from './ShowDetails';
import Genre from './Genre';
import './App.css';

const App = () => {
  return (
    <div>
      <header>
        <h1>Podcast App</h1>
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path="/genre/:id" element={<Genre />} />
          </Routes>
        </Router>
      </main>
      <footer>
        <p>&copy; 2024 Podcast App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;



