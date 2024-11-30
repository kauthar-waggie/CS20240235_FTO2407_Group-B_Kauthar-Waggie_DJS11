import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EpisodeDetails = () => {
  const { episodeId } = useParams(); 
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(null); 

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://podcast-api.netlify.app/api/episodes/${episodeId}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisode(data);
        console.log("Fetched episode data:", data);
      })
      .catch((err) => {
        setError('Failed to load episode details.');
        console.error("Fetch error:", err);
      })
      .finally(() => setLoading(false));

    const storedFavorite = localStorage.getItem('favoriteEpisode');
    if (storedFavorite) {
      setFavorite(storedFavorite);
    }
  }, [episodeId]);

  const toggleFavorite = () => {
    if (favorite === episodeId) {
      localStorage.removeItem('favoriteEpisode');
      setFavorite(null);
    } else {
      localStorage.setItem('favoriteEpisode', episodeId);
      setFavorite(episodeId);
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  if (loading) return <p>Loading episode details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="episode-details">
      <button onClick={handleGoBack}>Back</button>
      <h1>{episode?.title}</h1>
      <p>{episode?.description}</p>

      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={favorite === episodeId ? 'favourited' : ''}
      >
        {favorite === episodeId ? 'Unfavorite Episode' : 'Favorite Episode'}
      </button>
    </div>
  );
};

export default EpisodeDetails;
