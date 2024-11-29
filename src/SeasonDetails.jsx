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
  }, [id, seasonNumber]);

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
          {episodes.map((episode, index) => (
            <li key={episode.id || `${index}-${episode.title}`}> {/* Fallback key using index */}
              <h3>{episode.title}</h3>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeasonDetails;
