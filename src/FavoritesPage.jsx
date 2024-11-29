import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GENRE_MAP } from './utils/constants';

const FavoritesPage = () => {
  const [favoriteShows, setFavoriteShows] = useState([]);

  // Fetch favorite shows from localStorage or global state
  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteShows(favoritesFromStorage);
  }, []);

  // Helper to map genre IDs to names
  const getGenreNames = (genreIds) => {
    return genreIds
      .map((genreId) => GENRE_MAP[genreId] || 'Unknown Genre')
      .join(', ');
  };

  return (
    <div className="favorites-container">
      <h1>Your Favorite Shows</h1>

      {favoriteShows.length === 0 ? (
        <p>You have no favorite shows yet.</p>
      ) : (
        <div className="favorites-grid">
          {favoriteShows.map((show) => (
            <div key={show.id} className="favorite-show-card">
              <img src={show.image} alt={`Cover of ${show.title}`} className="show-image" />
              <div className="show-details">
                <h2>{show.title}</h2>
                <p>{show.description}</p>
                <p>Genres: {getGenreNames(show.genres)}</p>
                <p>Seasons: {show.seasons}</p>
                <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>

                {/* Listen button that links to the show details */}
                <Link to={`/show/${show.id}`} className="view-details-link">
                  Listen
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
