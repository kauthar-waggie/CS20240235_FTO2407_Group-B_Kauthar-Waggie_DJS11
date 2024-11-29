import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShow } from '../src/utils/api';
//import './ShowDetails.css'; // Ensure relevant styles are added here

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadShowDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const showData = await fetchShow(id);
        setShow(showData);
      } catch {
        setError('Failed to load show details.');
      } finally {
        setLoading(false);
      }
    };

    // Load the show details
    loadShowDetails();

    // Retrieve the favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, [id]);

  const handleFavoriteToggle = (seasonId, showId) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = updatedFavorites.findIndex(
      (fav) => fav.seasonId === seasonId && fav.showId === showId
    );

    if (favoriteIndex !== -1) {
      // If already a favorite, remove it
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      // If not a favorite, add it
      updatedFavorites.push({ seasonId, showId });
    }

    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites); // Update state
  };

  const isFavorite = (seasonId, showId) => {
    return favorites.some((fav) => fav.seasonId === seasonId && fav.showId === showId);
  };

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="show-details-container">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>

      {/* Show Details */}
      <h1>{show.title}</h1>
      <p>{show.description}</p>

      {/* Seasons Grid */}
      <div className="seasons-grid">
        {show.seasons.map((season, index) => (
          <div key={season.id || index} className="season-card">
            <img
              src={season.image}
              alt={`Season ${index + 1}`}
              className="season-image"
            />
            <h3>Season {index + 1}</h3>
            <p>{season.episodes.length} Episodes</p>

            {/* Favorite Button */}
            <button
              className={`heart-btn ${isFavorite(season.id, show.id) ? 'favorited' : ''}`}
              onClick={() => handleFavoriteToggle(season.id, show.id)}
              aria-label="Toggle Favorite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="heart-icon"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            {/* View Episodes Button */}
            <button onClick={() => navigate(`/show/${id}/season/${index + 1}`)} className="view-episodes-btn">
              View Episodes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetails;
