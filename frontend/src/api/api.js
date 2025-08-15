import axios from 'axios';

const API = axios.create({
  baseURL: 'https://login-signup-form-4cck.onrender.com/api', // backend URL
});

export const loginUser = (data) => API.post('/auth/login', data);
export const signupUser = (data) => API.post('/auth/signup', data);

