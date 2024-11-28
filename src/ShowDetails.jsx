import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShow } from '../src/utils/api';

const ShowDetails = () => {
  const { id } = useParams();  
  const navigate = useNavigate(); 
  const [show, setShow] = useState(null); 

  useEffect(() => {
    // Fetches the show details from the API using the show ID
    fetchShow(id)
      .then((data) => setShow(data))
      .catch((error) => console.error('Error fetching show details:', error));
  }, [id]);

  if (!show) return <p>Loading...</p>; 

  return (
    <div className="show-details-container">
      {/* Back to Show Button */}
      <button 
        onClick={() => {
          navigate(`/show/${id}`); 
        }} 
        className="back-to-show-btn"
        >
          Back to Show
      </button>

      <h1>{show.title}</h1>
      <p>{show.description}</p>

      {/* Season Preview Section */}
      <div className="seasons-grid">
        {show.seasons.map((season, index) => (
          <div key={season.id || index} className="season-card">  {/* Ensure season has unique key */}
            <img
              src={season.image}
              alt={`Season ${index + 1}`}
              className="season-image"
            />
            <h3>Season {index + 1}</h3>
            <p>{season.episodes.length} Episodes</p>
            <button
              onClick={() => navigate(`/show/${show.id}/season/${index + 1}`)}  // Navigate to specific season
            >
              View Episodes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetails;




