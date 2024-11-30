import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ShowDetails from './components/ShowDetails';
import Genre from './Genre';
import SeasonDetails from './components/SeasonDetails';
import FavoritesPage from './components/FavoritesPage';
import './App.css'; 
import EpisodeDetails from './components/EpisodeDetails';
import AudioPlayer from './components/AudioPlayer';


const App = () => {
  const audioSrc = "https://podcast-api.netlify.app/placeholder-audio.mp3";
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
          <Route path="/show/:id/season/:seasonNumber" element={<SeasonDetails />} />  {/* Season details page */}

          {/* Genre-specific listing */}
          <Route path="/genre/:id" element={<Genre />} />

          {/* Favorites page */}
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/episode/:episodeId" element={<EpisodeDetails />} />
        </Routes>
        {/* Always visible audio player */}
        <AudioPlayer audioSrc={audioSrc} />
      </main>
    </BrowserRouter>
  );
};

export default App;

