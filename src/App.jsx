import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ShowDetails from './ShowDetails';
import Genre from './Genre';
import './App.css';
import SeasonDetails from './SeasonDetails';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>Podcast App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path="/genre/:id" element={<Genre />} />
            <Route path="/show/:showId/season/:seasonNumber" element={<SeasonDetails />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Podcast App. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;



