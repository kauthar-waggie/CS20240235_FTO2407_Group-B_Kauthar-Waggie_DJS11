import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [favoriteSeasons, setFavoriteSeasons] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  // Fetch favorites from localStorage
  useEffect(() => {
    setFavoriteShows(JSON.parse(localStorage.getItem("favoriteShows")) || []);
    setFavoriteSeasons(JSON.parse(localStorage.getItem("favoriteSeasons")) || []);
    setFavoriteEpisodes(JSON.parse(localStorage.getItem("favoriteEpisodes")) || []);
    setLoading(false);
  }, []);

  const handleFavoriteToggle = (type, item) => {
    const storageKey = `favorite${type}`;
    const currentFavorites = JSON.parse(localStorage.getItem(storageKey)) || [];
    const isFavorited = currentFavorites.some((fav) => fav.id === item.id);

    const updatedFavorites = isFavorited
      ? currentFavorites.filter((fav) => fav.id !== item.id)
      : [...currentFavorites, { ...item, favoritedAt: new Date().toISOString() }];

    if (type === "Shows") setFavoriteShows(updatedFavorites);
    if (type === "Seasons") setFavoriteSeasons(updatedFavorites);
    if (type === "Episodes") setFavoriteEpisodes(updatedFavorites);

    localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
  };

  const sortFavorites = (items) => {
    return [...items].sort((a, b) => {
      if (sortOrder === "A-Z" || sortOrder === "Z-A") {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return sortOrder === "A-Z" ? -1 : 1;
        if (titleA > titleB) return sortOrder === "A-Z" ? 1 : -1;
        return 0;
      } else if (sortOrder === "Most Recent") {
        return new Date(b.favoritedAt) - new Date(a.favoritedAt);
      } else if (sortOrder === "Least Recent") {
        return new Date(a.favoritedAt) - new Date(b.favoritedAt);
      }
      return 0;
    });
  };

  const renderFavoriteCards = (type, items, onToggle) => (
    <div className="favorites-grid">
      {items.length === 0 ? (
        <p>You have no favorite {type.toLowerCase()} yet.</p>
      ) : (
        sortFavorites(items).map((item, index) => (
          <div key={item.id || `${item.title}-${item.favoritedAt || index}`} className="favorite-card">
            <img
              src={item.image || "https://podcast-api.netlify.app"}
              alt={item.title}
              className="favorite-image"
            />
            <div className="favorite-details">
              <h3>{item.title}</h3>
              <p>{item.description || "No description available."}</p>
              <button onClick={() => onToggle(type, item)}>
                Remove from Favorites
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="favorites-container">
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Your Favorites</h1>

      {/* Sorting Controls */}
      <div className="sorting-controls">
        <label htmlFor="sortOrder">Sort by: </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Most Recent">Most Recently Updated</option>
          <option value="Least updated">Least Updated</option>
        </select>
      </div>

      {/* Favorite Shows Section */}
      <h2>Favorite Shows</h2>
      {renderFavoriteCards("Shows", favoriteShows, handleFavoriteToggle)}

      {/* Favorite Seasons Section */}
      <h2>Favorite Seasons</h2>
      {renderFavoriteCards("Seasons", favoriteSeasons, handleFavoriteToggle)}

      {/* Favorite Episodes Section */}
      <h2>Favorite Episodes</h2>
      {renderFavoriteCards("Episodes", favoriteEpisodes, handleFavoriteToggle)}
    </div>
  );
};

export default FavoritesPage;
