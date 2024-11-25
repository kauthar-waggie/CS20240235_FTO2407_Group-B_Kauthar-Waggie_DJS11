import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../src/utils/api';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetchPreviews().then(setPreviews);
  }, []);

  return (
    <div className="home-container">
      <h1>Podcast Shows</h1>
      <div className="podcast-grid">
        {previews.map((preview) => (
          <div key={preview.id} className="podcast-card">
            <img src={preview.image} alt={preview.title} />
            <div className="podcast-details">
              <h2>{preview.title}</h2>
              <p>{preview.description}</p>
              <Link to={`/show/${preview.id}`} className="view-details-link">Listen</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
