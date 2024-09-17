import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true, // Enable credentials
  headers: {
    'Content-Type': 'application/json',
  },
});
