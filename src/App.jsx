import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path="/genre/:id" element={<Genre />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer>
        <p>&copy; 2024 Podcast App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;



