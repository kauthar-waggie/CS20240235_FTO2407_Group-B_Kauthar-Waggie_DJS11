import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGenre } from '../src/utils/api';

const Genre = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    fetchGenre(id).then(setGenre);
  }, [id]);

  if (!genre) return <p>Loading...</p>;

  return (
    <div>
      <h1>{genre.title}</h1>
      {genre.showIds.map((showId) => (
        <p key={showId}>Show ID: {showId}</p>
      ))}
    </div>
  );
};

export default Genre;
