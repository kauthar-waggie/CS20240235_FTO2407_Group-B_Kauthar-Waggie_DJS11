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

  // Fetch the complete show details
  const showDetails = await fetchShow(showId);

  const seasonIndex = seasonNumber - 1;
  if (!showDetails.seasons || !showDetails.seasons[seasonIndex]) {
    throw new Error(`Season ${seasonNumber} not found.`);
  }

  return showDetails.seasons[seasonIndex].episodes;
};

