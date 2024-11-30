import React from 'react';
import { Link } from 'react-router-dom';

const PodcastCard = ({ 
  podcast, 
  isFavorite, 
  onFavoriteToggle, 
  getGenreNames, 
  onContinueListening 
}) => {
  return (
    <div className="podcast-card">
      {/* Favorite Button */}
      <button onClick={() => onFavoriteToggle(podcast.id)}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
      
      <img
        src={podcast.image}
        alt={`Cover of ${podcast.title}`}
        className="podcast-image"
      />
      <div className="podcast-details">
        <h2>{podcast.title}</h2>
        <p>{podcast.description}</p>
        <p>Genres: {getGenreNames(podcast.genres)}</p>
        <p>Seasons: {podcast.seasons}</p>
        <p>Last Updated: {new Date(podcast.updated).toLocaleDateString()}</p>

        {/* Continue Listening */}
        <Link
          to={`/show/${podcast.id}`}
          onClick={() => onContinueListening(podcast.id, 1, 1)}
          className="view-details-link"
        >
          {podcast.isLastWatched ? 'Continue Listening (Continue)' : 'Listen'}
        </Link>
      </div>
    </div>
  );
};

export default PodcastCard;

