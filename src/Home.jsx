import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../src/utils/api';
import { Link } from 'react-router-dom';
import './Home.css';
import { GENRE_MAP } from '../src/utils/constants';

const Home = () => {
  const [previews, setPreviews] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('a-z');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  // Fetch previews and genres on component mount
  useEffect(() => {
    const loadPreviews = async () => {
      try {
        const data = await fetchPreviews();
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPreviews(sortedData);
        setFilteredShows(sortedData);

        // Extract unique genres
        const uniqueGenres = [...new Set(data.flatMap((show) => show.genres))];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching previews:', error);
      }
    };

    loadPreviews();
  }, []);

  // Filter and sort shows based on user input
  useEffect(() => {
    let filtered = [...previews];

    if (searchTerm) {
      filtered = filtered.filter((preview) =>
        preview.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((preview) =>
        preview.genres.includes(Number(selectedGenre)) // Match genre ID
      );
    }

    switch (sortOption) {
      case 'a-z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredShows(filtered);
  }, [searchTerm, selectedGenre, sortOption, previews]);

   // Helper to map genre IDs to names
   const getGenreNames = (genreIds) => {
    return genreIds
      .map((genreId) => GENRE_MAP[genreId] || 'Unknown Genre')
      .join(', ');
  };

  return (
    <div className="home-container">
      <h1>Shows</h1>

      {/* Filter and Sort Section */}
      <div className="filter-container">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for a show..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

         {/* Genre Filter */}
         <div className="genre-filter">
          <label htmlFor="genre">Filter by Genre:</label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genreId) => (
              <option key={genreId} value={genreId}>
                {GENRE_MAP[genreId] || 'Unknown Genre'}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
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

      {/* Podcast Grid */}
      <div className="podcast-grid">
        {filteredShows.length > 0 ? (
          filteredShows.map((preview) => (
            <div key={preview.id} className="podcast-card">
              <img
                src={preview.image}
                alt={`Cover of ${preview.title}`}
                className="podcast-image"
              />
              <div className="podcast-details">
                <h2>{preview.title}</h2>
                <p>{preview.description}</p>
                <p>Genres: {getGenreNames(preview.genres)}</p>
                <p>Seasons: {preview.seasons}</p>
                <p>Last Updated: {new Date(preview.updated).toLocaleDateString()}</p>
                <Link to={`/show/${preview.id}`} className="view-details-link">
                  Listen
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No shows found. Try adjusting your filters or search term.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

