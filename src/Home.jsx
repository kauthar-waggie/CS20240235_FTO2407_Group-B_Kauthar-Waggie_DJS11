import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../src/utils/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetchPreviews().then(setPreviews);
  }, []);

  return (
    <div>
      <h1>Podcast Previews</h1>
      {previews.map((preview) => (
        <div key={preview.id}>
          <h2>{preview.title}</h2>
          <p>{preview.description}</p>
          <img src={preview.image} alt={preview.title} />
          <Link to={`/show/${preview.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
