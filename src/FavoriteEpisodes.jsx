import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = ({ favorites = [] }) => {
  if (!favorites.length) {
    return <p>No favorite episodes yet.</p>;
  }

  // Group favorites by show and season
  const groupedFavorites = favorites.reduce((acc, fav) => {
    const groupKey = `Show ${fav.showId} - Season ${fav.seasonNumber}`;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(fav);
    return acc;
  }, {});

  return (
    <div>
      <h1>Your Favorite Episodes</h1>
      {Object.entries(groupedFavorites).map(([groupKey, episodes]) => (
        <section key={groupKey} className="favorite-group">
          <h2>{groupKey}</h2>
          <ul>
            {episodes.map((episode) => (
              <li key={episode.episodeId}>
                {episode.title}{' '}
                <Link to={`/show/${episode.showId}/season/${episode.seasonNumber}`}>
                  View Episode
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default Favorites;

