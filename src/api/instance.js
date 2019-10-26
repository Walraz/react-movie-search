import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY || null

if(!API_KEY) {
  throw Error('REACT_APP_API_KEY in .env is missing, get api_key from https://api.themoviedb.org, make an .env file in root folder and set REACT_APP_API_KEY to your api_key.')
}

export const BASE_URL = 'https://api.themoviedb.org/3'

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.api_key= API_KEY;
  return config;
});

export default instance