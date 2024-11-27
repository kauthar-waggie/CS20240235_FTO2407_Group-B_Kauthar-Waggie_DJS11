import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../src/utils/api';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [previews, setPreviews] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("a-z"); // Default sort
  const [selectedSeason, setSelectedSeason] = useState(null); // Track selected season
  const [selectedShow, setSelectedShow] = useState(null); // Track selected show
  

  useEffect(() => {
    // Fetches data and sort alphabetically by default
    fetchPreviews().then((data) => {
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
      setPreviews(sortedData);
      setFilteredShows(sortedData); // Initial filtered state
    });
  }, []);

  useEffect(() => {
    // Handle sorting on selected sort option
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
  }, [sortOption, previews]); // This re-sort when sortOption or previews change

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = previews.filter((preview) =>
      preview.title.toLowerCase().includes(term)
    );
    setFilteredShows(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option); // Trigger sorting when the dropdown changes
  };

  

  return (
    <div className="home-container">
      <h1>Shows</h1>
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
              <Link to={`/show/${preview.id}`} className="view-details-link">
                Listen
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

