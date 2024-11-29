import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShow } from '../src/utils/api';
import { fetchSeasonEpisodes } from '../src/utils/api';

const SeasonDetails = () => {
  const { id, seasonNumber } = useParams(); 
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setLoading(true);
        const episodes = await fetchSeasonEpisodes(id, parseInt(seasonNumber));
        setEpisodes(episodes);
      } catch (err) {
        setError(err.message || 'Error loading episodes');
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();

    // Load favorites from localStorage
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  const handleFavouriteToggle = (episodeId) => {
    const updatedFavourites = [...favourites];
    const favouriteIndex = updatedFavourites.findIndex((fav) => fav.episodeId === episodeId);

    if (favouriteIndex !== -1) {
      updatedFavourites.splice(favouriteIndex, 1); // Remove from favorites
    } else {
      updatedFavourites.push({ episodeId, showId: id, seasonId: seasonNumber }); // Add to favorites
    }

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  };

  const isFavourite = (episodeId) => {
    return favourites.some((fav) => fav.episodeId === episodeId);
  };

  const handleGoBackToSeasons = () => {
    navigate(`/show/${id}`); // Navigate back to the seasons list 
  };

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Back to Seasons button */}
      <button onClick={handleGoBackToSeasons}>Back to Seasons</button>

      <h1>{show?.title}</h1>
      <p>{show?.description}</p>

      {/* Display episodes for the selected season */}
      <h2>Season {seasonNumber} Episodes</h2>
      {episodes.length === 0 ? (
        <p>No episodes available.</p>
      ) : (
        <ul>
          {episodes.map((episode, index) => {
            const episodeKey = episode.id ? episode.id : `${index}-${seasonNumber}`; // Use index if no episode.id is available
            return (
              <li key={episodeKey}> {/* Unique key using episode.id or index */}
                <h3>{episode.title}</h3>
                <audio controls>
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                {/* Add favorite button */}
                <button onClick={() => handleFavouriteToggle(episode.id)}>
                  {isFavourite(episode.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SeasonDetails;
