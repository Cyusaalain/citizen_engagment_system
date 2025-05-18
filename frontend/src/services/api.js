import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});
// citizen endpoints
export const submitComplaint = (data) => API.post('/citizen/submit', data);
export const trackComplaint = (id) => API.get(`/citizen/track/${id}`);

// admin endpoints
export const loginAdmin = (data) => API.post('/admin/login' , data); //stubbed
export const fetchComplaints = (username) => API.get('/admin/complaints?username=${username}');
export const respondToComplaint = (id, data) => API.put('/admin/respond/${id}', data);