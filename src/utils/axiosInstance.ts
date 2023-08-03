import axios from 'axios';
import Cookies from 'js-cookie';

const ax = axios.create({
  baseURL: 'https://techtest.folkatech.com/api/',
});
ax.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Headers'] = '*';

    return config;
  },
  (error) => Promise.reject(error)
);

export default ax;
