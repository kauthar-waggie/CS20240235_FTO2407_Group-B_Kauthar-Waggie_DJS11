import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ShowDetails from './ShowDetails';
import Genre from './Genre';
import SeasonDetails from './SeasonDetails';
import FavouriteEpisodes from './FavoriteEpisodes';
import './App.css'; // External styles

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <h1>Podcast App</h1>
      </header>
      <main>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Show-related pages */}
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/show/:showId/season/:seasonNumber" element={<SeasonDetails />} />

          {/* Genre-specific listing */}
          <Route path="/genre/:id" element={<Genre />} />

          {/* Favorites page */}
          <Route path="/favourites" element={<FavouriteEpisodes />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};


export default App;
