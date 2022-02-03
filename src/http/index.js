import axios from 'axios';

export const $host = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_API_TOKEN,
    language: "ru-RU",
    region: "RU"
  }
});
