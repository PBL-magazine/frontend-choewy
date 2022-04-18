import axios from 'axios';
import { getTokenFromCookie } from './Cookie';

const setHeaderAuthorization = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const Axios = () => {
  const token = getTokenFromCookie();
  token && setHeaderAuthorization(token);
  return axios;
};

export default Axios();
