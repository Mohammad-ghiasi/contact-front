import axios from 'axios';

export default axios.create({
  baseURL: 'https://contacts-api-3q2l.vercel.app',
  withCredentials: true, // Enable credentials
});

// https://contacts-api-3q2l.vercel.app
