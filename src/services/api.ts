import axios from 'axios';

export default axios.create({
  baseURL: 'https://backend-2-two.vercel.app/',
  withCredentials: true, // Enable credentials
  headers: {
    'Content-Type': 'application/json',
  },
});
