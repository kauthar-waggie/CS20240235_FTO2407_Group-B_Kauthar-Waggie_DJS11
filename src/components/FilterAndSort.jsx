import React from 'react';
import { GENRE_MAP } from '../utils/constants';

const FilterAndSort = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedGenre, 
  setSelectedGenre, 
  sortOption, 
  setSortOption, 
  genres 
}) => {
  return (
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
          <option value="newly-updated">Newest Updated</option>
          <option value="oldest-updated">Oldest Updated</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSort;
