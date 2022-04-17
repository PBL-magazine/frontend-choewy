import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const Axios = () => {
  const token = cookies.get('token');

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(axios.defaults.headers.common);
  }
  return axios;
};

export default Axios();
