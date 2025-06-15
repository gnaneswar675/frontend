import axios from 'axios';
import { getToken } from '../utils/auth';
import config from '../config/config';

const API_URL = `${config.API_BASE_URL}/api/problems`;

export const fetchProblems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw new Error('Failed to fetch problems');
  }
};

export const createProblem = async (formData) => {
  try {
    const token = getToken();
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating problem:', error);
    throw new Error('Failed to create problem');
  }
};

export const voteProblem = async (problemId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/${problemId}/vote`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to vote');
  }
};

export const updateProblemStatus = async (problemId, status) => {
  try {
    const token = getToken();
    const response = await axios.patch(
      `${API_URL}/${problemId}/status`,
      { status },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update status');
  }
};
