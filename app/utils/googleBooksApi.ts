import axios from 'axios';

const API_KEY = process.env.API_KEY;
console.log("API: ", API_KEY);
const googleBooksAPI = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/',
  params: {
    key: API_KEY,
  },
});

export default googleBooksAPI;