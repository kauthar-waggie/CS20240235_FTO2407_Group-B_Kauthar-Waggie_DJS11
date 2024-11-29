import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GENRE_MAP } from '../src/utils/constants';

const FavoritesPage = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetch favorite episodes from localStorage
  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteEpisodes(favoritesFromStorage);
    setLoading(false);
  }, []);

  // Helper to map genre IDs to names (not needed for episodes but can be reused for shows)
  const getGenreNames = (genreIds) => {
    if (!Array.isArray(genreIds)) return 'Unknown Genre';
    return genreIds
      .map((genreId) => GENRE_MAP[genreId] || 'Unknown Genre')
      .join(', ');
  };

  // Back button handler
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Check for unique episodes based on episodeId (to avoid duplicate entries)
  const uniqueEpisodes = [...new Map(favoriteEpisodes.map((ep) => [ep.episodeId, ep])).values()];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="favorites-container">
      <button onClick={handleGoBack}>Back</button> {/* Back button */}
      <h1>Your Favorite Episodes</h1>

      {uniqueEpisodes.length === 0 ? (
        <p>You have no favorite episodes yet.</p>
      ) : (
        <div className="favorites-grid">
          {uniqueEpisodes.map((episode) => (
            <div key={episode.episodeId} className="favorite-episode-card">
              <h3>{episode.title}</h3>
              <p>Show ID: {episode.showId} | Season: {episode.seasonId}</p>

              {/* Displaying more episode details */}
              <Link to={`/show/${episode.showId}/season/${episode.seasonId}`} className="view-details-link">
                View Episode Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
