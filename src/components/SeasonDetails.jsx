import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSeasonEpisodes, fetchShow } from '../utils/api';

const SeasonDetails = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [showData, episodesData] = await Promise.all([
          fetchShow(id),
          fetchSeasonEpisodes(id, parseInt(seasonNumber)),
        ]);
        setShow(showData);
        setEpisodes(episodesData);
      } catch {
        setError('Failed to load season details.');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const storedFavorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavorites(storedFavorites);
  }, [id, seasonNumber]);

  const handleFavoriteToggle = (episodeId) => {
    const updatedFavorites = favorites.some((fav) => fav.episodeId === episodeId)
      ? favorites.filter((fav) => fav.episodeId !== episodeId)
      : [...favorites, { episodeId, seasonId: seasonNumber, showId: id, favoritedAt: new Date().toISOString() }];

    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const isFavorite = (episodeId) => favorites.some((fav) => fav.episodeId === episodeId);

  if (loading) return <p>Loading season details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={() => navigate(`/show/${id}`)}>Back to Seasons</button>
      <h1>{show?.title}</h1>
      <h2>Season {seasonNumber}</h2>

      {episodes.length === 0 ? (
        <p>No episodes available.</p>
      ) : (
        <ul>
          {episodes.map((episode, index) => (
            <li key={episode.id || index}>
              <h3>{episode.title}</h3>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button onClick={() => handleFavoriteToggle(episode.id)}>
                {isFavorite(episode.id) ? 'Unfavorite' : 'Favorite'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeasonDetails;


