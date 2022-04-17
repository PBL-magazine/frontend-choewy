import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const Axios = () => {
  /* 쿠키에서 토큰 정보를 가져옵니다. */
  const token = cookies.get('token');

  /* 토큰 정보를 요청 Header에 추가합니다. */
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return axios;
};

export default Axios();
