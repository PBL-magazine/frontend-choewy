import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getTokenFromCookie = () => {
  return cookies.get('token');
};

export const removeTokenFromCookie = () => {
  cookies.remove('token');
};
