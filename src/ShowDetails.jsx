import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShow } from '../src/utils/api';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetchShow(id).then(setShow);
  }, [id]);

  if (!show) return <p>Loading...</p>;

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>
      {show.seasons.map((season) => (
        <div key={season.id}>
          <h2>{season.title}</h2>
          {season.episodes.map((episode) => (
            <div key={episode.id}>
              <h3>{episode.title}</h3>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
              </audio>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ShowDetails;
