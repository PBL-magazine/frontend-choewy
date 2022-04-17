import Axios from '../utils/Axios';

const UserActions = {
  signout: async () => {
    return await Axios.delete('/api/users/signout').then((response) => {
      const {
        data: { ok },
      } = response;
      return ok;
    });
  },
  signup: async (userDto) => {
    const { email, nickname, password, confirmPassword } = userDto;

    if (!email) return alert('이메일 형식을 확인하세요.');
    if (!nickname) return alert('닉넨임 형식을 확인하세요.');
    if (!password) return alert('비밀번호 형식을 확인하세요.');
    if (password !== confirmPassword)
      return alert('비밀번호가 일치하지 않습니다.');

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

  signin: async (userDto) => {
    const { email, password } = userDto;

    if (!email) return alert('이메일 형식을 확인하세요.');
    if (!password) return alert('이메일 형식을 확인하세요.');
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
