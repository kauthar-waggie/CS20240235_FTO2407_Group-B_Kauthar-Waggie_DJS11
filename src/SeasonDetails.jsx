// seasondetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSeasonEpisodes, fetchShow } from '../src/utils/api';

const SeasonDetails = () => {
  const { showId, seasonNumber } = useParams();
  const navigate = useNavigate();
  const [season, setSeason] = useState(null);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch show and season data concurrently
    Promise.all([fetchShow(showId), fetchSeasonEpisodes(showId, seasonNumber)])
      .then(([fetchedShow, fetchedSeason]) => {
        setShow(fetchedShow);
        setSeason(fetchedSeason);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to load season details. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [showId, seasonNumber]);

  if (loading) return <p>Loading season details...</p>;
  if (error) return <p>{error}</p>;
  if (!season || !show) return <p>No data available for this season.</p>;

  const episodes = season.episodes || [];

  const handleFavourite = (episode) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isAlreadyFavourite = favourites.some(
      (fav) => fav.id === episode.id
    );

    if (!isAlreadyFavourite) {
      favourites.push({
        id: episode.id,
        title: episode.title,
        show: show.title,
        season: seasonNumber,
        file: episode.file,
      });
      localStorage.setItem('favourites', JSON.stringify(favourites));
    } else {
      alert('This episode is already in your favourites.');
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button onClick={() => navigate("/")}>
        Back to Home
      </button>

      {/* Season Details */}
      <h2>Season {seasonNumber}</h2>
      <p>{episodes.length} Episodes</p>

      {/* Episode List */}
      <div className="episodes-list">
        {episodes.length > 0 ? (
          episodes.map((episode) => (
            <div key={episode.id} className="episode-card">
              <h3>{episode.title}</h3>
              <button onClick={() => setCurrentEpisode(episode)}>
                Play Episode
              </button>
              {/* Favourite Button */}
              <button onClick={() => handleFavourite(episode)}>
                Add to Favourites
              </button>
            </div>
          ))
        ) : (
          <p>No episodes available for this season.</p>
        )}
      </div>

      {/* Audio Player */}
      {currentEpisode && (
        <div className="audio-player">
          <h3>Now Playing: {currentEpisode.title}</h3>
          <audio controls>
            <source src={currentEpisode.file} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default SeasonDetails;
