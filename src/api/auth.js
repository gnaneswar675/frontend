import axios from 'axios';
import config from '../config/config';

const API_URL = `${config.API_BASE_URL}/api/auth`;

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};
