import axios from 'axios';

const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchPreviews = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchGenre = async (id) => {
  const response = await axios.get(`${BASE_URL}/genre/${id}`);
  return response.data;
};

export const fetchShow = async (id) => {
  const response = await axios.get(`${BASE_URL}/id/${id}`);
  return response.data;
};

export const fetchSeasonEpisodes = async (showId, seasonNumber) => {
  const response = await fetch(
    `https://podcast-api.netlify.app/${showId}/seasons/${seasonNumber}/episodes`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch episodes.");
  }
  return await response.json();
};
