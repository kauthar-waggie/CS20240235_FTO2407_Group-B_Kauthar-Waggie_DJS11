import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EpisodeDetails = () => {
  const { episodeId } = useParams(); // Episode ID
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate API call to fetch episode details
    fetch(`/api/episodes/${episodeId}`)
      .then((response) => response.json())
      .then((data) => setEpisode(data))
      .catch(() => setError('Failed to load episode details.'))
      .finally(() => setLoading(false));

    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, [episodeId]);

  const toggleFavorite = () => {
    const exists = favorites.some((fav) => fav.episodeId === episodeId);
    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter((fav) => fav.episodeId !== episodeId);
    } else {
      updatedFavorites = [...favorites, { episodeId }];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const isFavorite = favorites.some((fav) => fav.episodeId === episodeId);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) return <p>Loading episode details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="episode-details">
      <button onClick={handleGoBack}>Back</button>
      <h1>{episode.title}</h1>
      <p>{episode.description}</p>

      {/* Favorite Button */}
      <button onClick={toggleFavorite} className={isFavorite ? 'favourited' : ''}>
        {isFavorite ? 'Unfavorite Episode' : 'Favorite Episode'}
      </button>
    </div>
  );
};

export default EpisodeDetails;
