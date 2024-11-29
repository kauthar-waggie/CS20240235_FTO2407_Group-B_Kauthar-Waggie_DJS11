import axios from 'axios';

const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchPreviews = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchGenre = async (id) => {
  if (!id) {
    throw new Error('ID is required for fetching genre');
  }
  const response = await axios.get(`${BASE_URL}/genre/${id}`);
  return response.data;
};

export const fetchShow = async (id) => {
  if (!id) {
    throw new Error('Show ID is required');
  }
  const response = await axios.get(`${BASE_URL}/id/${id}`);
  return response.data;
};

export const fetchSeasonEpisodes = async (showId, seasonNumber) => {
  if (!showId) {
    throw new Error('Show ID is required');
  }

  // Fetches the complete show details
  const showDetails = await fetchShow(showId);

  // Checks if seasons exist and find the selected season
  const season = showDetails.seasons?.[seasonNumber];
  if (!season) {
    throw new Error('Season not found.');
  }

  return season.episodes;
};

