import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const submitComplaint = (data) => API.post('/citizen/submit', data);
export const trackComplaint = (id) => API.get(`/citizen/track/${id}`);
