import React, { useEffect, useState } from 'react';
import { fetchPreviews, fetchSeasonEpisodes } from '../src/utils/api';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => {
  const [previews, setPreviews] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("a-z");
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPreviews()
      .then((data) => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPreviews(sortedData);
        setFilteredShows(sortedData);
      })
      .catch((error) => console.error("Error fetching previews:", error));
  }, []);

  useEffect(() => {
    let sorted;
    switch (sortOption) {
      case "a-z":
        sorted = [...previews].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        sorted = [...previews].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "most-viewed":
        sorted = [...previews].sort((a, b) => b.views - a.views);
        break;
      default:
        sorted = [...previews];
    }
    setFilteredShows(sorted);
  }, [sortOption, previews]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = previews.filter((preview) =>
      preview.title.toLowerCase().includes(term)
    );
    setFilteredShows(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleSeasonSelect = async (showId, seasonNumber) => {
    setSelectedShow(showId);
    setSelectedSeason(seasonNumber);
    setIsModalOpen(true);

    try {
      const episodes = await fetchSeasonEpisodes(showId, seasonNumber); // Fetch episodes for the selected season
      setSeasonEpisodes(episodes);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeason(null);
    setSelectedShow(null);
    setSeasonEpisodes([]);
  };

  return (
    <div className="home-container">
      <h1>Podcast Shows</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search for a show..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <div className="sort-container">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="sort-dropdown"
          >
            <option value="a-z">Alphabetical (A-Z)</option>
            <option value="z-a">Alphabetical (Z-A)</option>
            <option value="most-viewed">Most Viewed</option>
          </select>
        </div>
      </div>
      <div className="podcast-grid">
        {filteredShows.map((preview) => (
          <div key={preview.id} className="podcast-card">
            <img src={preview.image} alt={preview.title} />
            <div className="podcast-details">
              <h2>{preview.title}</h2>
              <p>{preview.description}</p>
              <p>Seasons: {preview.seasons}</p> {/* Total number of seasons */}
              <div className="seasons-list">
                {[...Array(preview.seasons).keys()].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSeasonSelect(preview.id, index + 1)}
                  >
                    Season {index + 1}
                  </button>
                ))}
              </div>
              <Link to={`/show/${preview.id}`} className="view-details-link">
                Listen
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Episodes */}
      {isModalOpen && selectedShow !== null && selectedSeason !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <h2>
              Episodes for Season {selectedSeason} -{" "}
              {
                previews.find((preview) => preview.id === selectedShow)?.title
              }
            </h2>
            <div className="episodes-list">
              {seasonEpisodes.length > 0 ? (
                seasonEpisodes.map((episode) => (
                  <div key={episode.id} className="episode-card">
                    <h3>{episode.title}</h3>
                    <a
                      href={episode.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen to Episode
                    </a>
                  </div>
                ))
              ) : (
                <p>Loading episodes...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;