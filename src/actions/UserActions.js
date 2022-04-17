import Axios from '../utils/Axios';

const UserActions = {
  /* 로그아웃을 요청하며, 서버로부터 비어있는 토큰을 쿠키로 전달받습니다. */
  signout: async () => {
    return await Axios.delete('/api/users/signout').then((response) => {
      const {
        data: { ok },
      } = response;
      return ok;
    });
  },

  /* 회원가입을 요청하며, 성공 시 서버로부터 유효한 토큰을 쿠키로 전달받습니다. */
  signup: async (userDto) => {
    return await Axios.post('/api/users/signup', userDto)
      .then((response) => {
        const {
          data: { ok },
        } = response;
        return { ok };
      })
      .catch((error) => {
        const {
          response: {
            data: { ok, message },
          },
        } = error;
        return { ok, message };
      });
  },

  /* 로그인을 요청하며, 성공 시 서버로부터 유효한 토큰을 쿠키로 전달받습니다. */
  signin: async (userDto) => {
    return await Axios.post('/api/users/signin', userDto)
      .then((response) => {
        const {
          data: { ok },
        } = response;
        return { ok };
      })
      .catch((error) => {
        const {
          response: {
            data: { ok, message },
          },
        } = error;
        return { ok, message };
      });
  },

  /* 로그인 상태 유지를 위해 서버로부터 현재 쿠키의 유효성을 평가받습니다. */
  authorize: async () => {
    return await Axios.get('/api/users/auth')
      .then((response) => {
        const {
          data: { ok, user },
        } = response;
        return { ok, user };
      })
      .catch((error) => {
        const {
          response: {
            data: { ok, message },
          },
        } = error;
        return { ok, message };
      });
  },
};

export default UserActions;
