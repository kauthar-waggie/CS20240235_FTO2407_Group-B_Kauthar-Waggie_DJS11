import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../src/utils/api';
import { useNavigate } from 'react-router-dom';
import FilterAndSort from './components/FilterAndSort';
import PodcastCard from './components/PodcastCard'; 
import { GENRE_MAP } from './utils/constants';


import './Home.css';

const Home = () => {
  const [previews, setPreviews] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('a-z');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [lastWatched, setLastWatched] = useState(null);
  const navigate = useNavigate();

  // Fetch previews and genres
  useEffect(() => {
    const loadPreviews = async () => {
      try {
        const data = await fetchPreviews();
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPreviews(sortedData);
        setFilteredShows(sortedData);

        // Extract unique genres
        setGenres([...new Set(data.flatMap((show) => show.genres))]);

        // Load favorites and last watched from localStorage
        setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
        setLastWatched(JSON.parse(localStorage.getItem('lastWatched')) || null);
      } catch (error) {
        console.error('Error fetching previews:', error);
      }
    };
    

    loadPreviews();
  }, []);

  // Reset all progress and clear favorites and history
  const handleResetProgress = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.');

    if (confirmReset) {
      localStorage.removeItem('lastWatched');

      setFavorites([]);
      setLastWatched(null);

      alert('Your progress has been reset.');
    }
  };

  /// Handle favorite toggle
  const handleFavorite = (showId) => {
    let updatedFavorites = [...favorites];
    if (updatedFavorites.includes(showId)) {
      updatedFavorites = updatedFavorites.filter(id => id !== showId); // Remove from favorites
    } else {
      updatedFavorites.push(showId); // Add to favorites
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
  };


  // Filter and sort shows
  useEffect(() => {
    let filtered = [...previews];
    if (searchTerm) {
      filtered = filtered.filter((preview) =>
        preview.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedGenre) {
      filtered = filtered.filter((preview) =>
        preview.genres.includes(Number(selectedGenre))
      );
    }
    // Sorting
    switch (sortOption) {
      case 'a-z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newly-updated':
        filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case 'oldest-updated':
        filtered.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      default:
        break;
    }
    setFilteredShows(filtered);
  }, [searchTerm, selectedGenre, sortOption, previews]);

  // Toggle favorite
  const handleFavoriteToggle = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Continue listening
  const handleContinueListening = (id, season, episode) => {
    setLastWatched({ id, season, episode });
    localStorage.setItem('lastWatched', JSON.stringify({ id, season, episode }));
  };

  // Helper to map genres
  const getGenreNames = (genreIds) => {
    return genreIds.map(id => GENRE_MAP[id] || 'Unknown');
  };
  

  return (
    <div className="home-container">
      {/* Reset Progress Button */}
      <div className="reset-progress-button">
        <button onClick={handleResetProgress}>Reset All Progress</button>
      </div>
      {/* Favorite Shows Button */}
      <div className="favorites-button">
        <button onClick={() => navigate('/favorites')}>Your Favorite Shows</button>
      </div>
      <h1>Shows</h1>
      <FilterAndSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortOption={sortOption}
        setSortOption={setSortOption}
        genres={genres}
      />
      <div className="podcast-grid">
        {filteredShows.length > 0 ? (
          filteredShows.map((show) => (
            <PodcastCard
              key={show.id}
              podcast={show}
              isFavorite={favorites.includes(show.id)}
              onFavoriteToggle={handleFavoriteToggle}
              getGenreNames={getGenreNames}
              onContinueListening={handleContinueListening}
            />
          ))
        ) : (
          <p>No shows found. Try adjusting your filters or search term.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
