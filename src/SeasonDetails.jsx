import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShow } from '../src/utils/api';

const SeasonDetails = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('ID:', id);  
    console.log('Season Number:', seasonNumber);
    if (!id) {
      setError('Show ID is required');
      setLoading(false);
      return;
    }

    // Fetch show details using the provided 'id'
    setLoading(true);
    setError(null);
    fetchShow(id)
      .then((data) => {
        setShow(data);  // Store the show data
        const season = data.seasons?.[seasonNumber - 1]; // Get season data based on season number
        setEpisodes(season?.episodes || []); // Get episodes for the specific season
      })
      .catch((err) => {
        setError('Error fetching show details');
      })
      .finally(() => setLoading(false));
  }, [id, seasonNumber]); 

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;

  // Navigate back to the seasons page
  const handleGoBackToSeasons = () => {
    navigate(`/show/${id}`); 
  };

  return (
    <div>
      {/* Back to Seasons button */}
      <button onClick={handleGoBackToSeasons}>Back to Seasons</button>

      <h1>{show?.title}</h1>
      <p>{show?.description}</p>

      {/* Display episodes for the selected season */}
      <h2>Season {seasonNumber} Episodes</h2>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>{episode.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SeasonDetails;


