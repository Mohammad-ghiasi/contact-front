import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true, // Enable credentials
});

// https://contacts-api-3q2l.vercel.app
