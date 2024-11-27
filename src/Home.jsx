import React, { useEffect, useState } from 'react';
import { fetchPreviews, fetchSeasonEpisodes } from '../src/utils/api';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [previews, setPreviews] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("a-z");
  const [selectedGenre, setSelectedGenre] = useState(""); 
  const [genres, setGenres] = useState([]); 
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fetch previews and extract genres
  useEffect(() => {
    fetchPreviews()
      .then((data) => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPreviews(sortedData);
        setFilteredShows(sortedData);

        // Extract unique genres
        const uniqueGenres = Array.from(
          new Set(data.flatMap((show) => show.genres))
        );
        setGenres(uniqueGenres);
      })
      .catch((error) => console.error("Error fetching previews:", error));
  }, []);

  // Filter and sort shows based on search term, genre, and sort option
  useEffect(() => {
    let filtered = [...previews];

    if (searchTerm) {
      filtered = filtered.filter((preview) =>
        preview.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((preview) =>
        preview.genres.includes(selectedGenre)
      );
    }

    switch (sortOption) {
      case "a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "most-viewed":
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredShows(filtered);
  }, [searchTerm, selectedGenre, sortOption, previews]);

  const handleSeasonSelect = async (showId, seasonIndex) => {
    setSelectedShow(showId);
    setSelectedSeason(seasonIndex);

    try {
      const episodes = await fetchSeasonEpisodes(showId, seasonIndex);
      setSeasonEpisodes(episodes);
      setIsModalOpen(true);
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
      <h1>Shows</h1>

      {/* Filters */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search for a show..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="genre-filter">
          <label htmlFor="genre">Filter by Genre:</label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-container">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-dropdown"
          >
            <option value="a-z">Alphabetical (A-Z)</option>
            <option value="z-a">Alphabetical (Z-A)</option>
            <option value="most-viewed">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Shows Grid */}
      <div className="podcast-grid">
        {filteredShows.map((preview) => (
          <div key={preview.id} className="podcast-card">
            <img src={preview.image} alt={preview.title} />
            <div className="podcast-details">
              <h2>{preview.title}</h2>
              <p>{preview.description}</p>
              <p>Genres: {preview.genres.join(", ")}</p>
              <p>Seasons: {preview.seasons}</p>
              <p>Last Updated: {formatDate(preview.updated)}</p>
              <div className="seasons-list">
                {[...Array(preview.seasons).keys()].map((_, index) => (
                  <button
                    key={`${preview.id}-season-${index}`}
                    onClick={() => handleSeasonSelect(preview.id, index)}
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
              Episodes for Season {selectedSeason + 1} -{" "}
              {previews.find((preview) => preview.id === selectedShow)?.title}
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
