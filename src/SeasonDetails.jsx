import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShow } from '../src/utils/api';

const SeasonDetails = () => {
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      })
      .catch((err) => {
        setError('Error fetching show details');
      })
      .finally(() => setLoading(false));
  }, [id]); // Dependency on 'id'

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{show?.title}</h1>
      <p>{show?.description}</p>
      {/* Render other details */}
    </div>
  );
};

export default SeasonDetails;
