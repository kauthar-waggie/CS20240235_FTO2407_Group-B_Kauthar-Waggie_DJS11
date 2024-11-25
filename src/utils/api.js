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
