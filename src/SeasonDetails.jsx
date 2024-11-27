import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSeasonEpisodes, fetchShow } from '../src/utils/api';

const SeasonDetails = () => {
  const { showId, seasonNumber } = useParams();
  const navigate = useNavigate();
  const [season, setSeason] = useState(null);
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetchShow(showId).then(setShow);
    fetchSeasonEpisodes(showId, seasonNumber).then(setSeason);
  }, [showId, seasonNumber]);

  if (!season || !show) return <p>Loading season details...</p>;

  return (
    <div>
      <button onClick={() => navigate(`/show/${showId}`)}>Back to {show.title}</button>
      <h2>Season {seasonNumber}</h2>
      <p>{season.episodes.length} Episodes</p>
      <div className="episodes-list">
        {season.episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            <h3>{episode.title}</h3>
            <a href={episode.file} target="_blank" rel="noopener noreferrer">
              Listen to Episode
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetails;
