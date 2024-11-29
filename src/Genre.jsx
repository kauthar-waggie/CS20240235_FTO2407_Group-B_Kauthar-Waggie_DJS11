import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGenre } from '../src/utils/api';

const Genre = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const data = await fetchGenre(id);
        setGenre(data);
      } catch (err) {
        setError('Failed to fetch genre details. Please try again.');
      }
    };

    fetchGenreData();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!genre) return <p>Loading...</p>;

  return (
    <section>
      <h1>{genre.title}</h1>
      <ul>
        {genre.showIds.map((showId) => (
          <li key={showId}>Show ID: {showId}</li>
        ))}
      </ul>
    </section>
  );
};

export default Genre;

