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
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchShow(id)
    .then((data) => {
      setShow(data); 
    })
    .catch((err) => {
      setError('Failed to load show details.');
    })
    .finally(() => setLoading(false));

    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, [id]);

  const handleFavouriteToggle = (episodeId, showId) => {
    const updatedFavourites = [...favourites];
    const favouriteIndex = updatedFavourites.findIndex(
      (fav) => fav.episodeId === episodeId && fav.showId === showId
    );

    if (favouriteIndex !== -1) {
      updatedFavourites.splice(favouriteIndex, 1);
    } else {
      updatedFavourites.push({ episodeId, showId });
    }

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  };

  const isFavourite = (episodeId, showId) => {
    return favourites.some((fav) => fav.episodeId === episodeId && fav.showId === showId);
  };

  // Navigate back to the homepage
  const handleGoBackToHome = () => {
    navigate(`/`); // Navigate back to the homepage
  };

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="show-details-container">
      {/* Back to Homepage button */}
      <button onClick={handleGoBackToHome}>Back to Homepage</button>

      <h1>{show.title}</h1>
      <p>{show.description}</p>

      {/* Season Preview Section */}
      <div className="seasons-grid">
        {show.seasons.map((season, index) => (
          <div key={season.id || index} className="season-card">
            <img
              src={season.image}
              alt={`Season ${index + 1}`}
              className="season-image"
            />
            <h3>Season {index + 1}</h3>
            <p>{season.episodes.length} Episodes</p> {/* Display number of episodes */}

            <button
              className={`heart-btn ${isFavourite(season.id, show.id) ? 'favourited' : ''}`}
              onClick={() => handleFavouriteToggle(season.id, show.id)}
              aria-label="Favourite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="heart-icon"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                ></path>
              </svg>
            </button>
            
            <button onClick={() => navigate(`/show/${id}/season/${index + 1}`)}>
              View Episodes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetails;
