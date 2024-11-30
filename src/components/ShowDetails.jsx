import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShow } from '../utils/api';

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchShow(id);
        setShow(data);
      } catch (err) {
        setError('Failed to load show details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const storedFavourites = JSON.parse(localStorage.getItem('favouriteSeasons')) || [];
    setFavourites(Array.isArray(storedFavourites) ? storedFavourites : []); 
  }, [id]);

  // Toggle favourite for a specific season
  const handleFavoriteToggle = (seasonId) => {
    const updatedFavourites = favourites.includes(seasonId)
      ? favourites.filter((fav) => fav !== seasonId) 
      : [...favourites, seasonId]; 

    localStorage.setItem('favouriteSeasons', JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  };

  const isFavorite = (seasonId) => favourites.includes(seasonId);

  const handleGoBackToHome = () => {
    navigate(`/`); // Navigate back to the homepage
  };

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="show-details-container">
      <button onClick={handleGoBackToHome}>Back to Homepage</button>
      <h1>{show.title}</h1>
      <p>{show.description}</p>

      <div className="seasons-grid">
        {show.seasons.map((season, index) => (
          <div key={season.id || `season-${index}`} className="season-card">
            <img
              src={season.image}
              alt={`Season ${index + 1}`}
              className="season-image"
            />
            <h3>Season {index + 1}</h3>
            <p>{season.episodes.length} Episodes</p>
            <button onClick={() => handleFavoriteToggle(season.id)}>
              {isFavorite(season.id) ? 'Unfavourite' : 'Favourite'}
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





