import Axios from 'axios';

const api = Axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL_HTTP,
});

export { api };
