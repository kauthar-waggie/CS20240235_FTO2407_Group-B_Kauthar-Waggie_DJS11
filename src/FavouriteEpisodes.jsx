// FavouriteEpisodes.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FavouriteEpisodes = () => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Retrieve favourites from localStorage
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  const groupedFavourites = favourites.reduce((acc, episode) => {
    // Group episodes by show and season
    const key = `${episode.show} - Season ${episode.season}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(episode);
    return acc;
  }, {});

  return (
    <div>
      <h1>My Favourite Episodes</h1>
      {Object.keys(groupedFavourites).map((groupKey) => (
        <div key={groupKey} className="favourite-group">
          <h2>{groupKey}</h2>
          <div className="episodes-list">
            {groupedFavourites[groupKey].map((episode) => (
              <div key={episode.id} className="episode-card">
                <h3>{episode.title}</h3>
                <button onClick={() => navigate(`/show/${episode.showId}/season/${episode.season}/episode/${episode.id}`)}>
                  View Episode Details
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouriteEpisodes;
