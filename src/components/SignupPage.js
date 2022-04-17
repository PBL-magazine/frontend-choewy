import { useState } from 'react';
import UserActions from '../actions/UserActions';

const SignupPage = () => {
  const [userDto, setUserDto] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const userDtoChange = (e) => {
    const {
      target: { name, value },
    } = e;

    setUserDto({ ...userDto, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, nickname, password, confirmPassword } = userDto;

    if (!email) return alert('이메일 형식을 확인하세요.');
    if (!nickname) return alert('닉넨임 형식을 확인하세요.');
    if (!password) return alert('비밀번호 형식을 확인하세요.');
    if (password !== confirmPassword)
      return alert('비밀번호가 일치하지 않습니다.');

    const { ok, message } = await UserActions.signup(userDto);
    if (!ok) return alert(message);
    window.location.pathname = '/';
  };

  return (
    <div className="container">
      <h1>회원가입 페이지</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={userDto.email}
            placeholder="이메일"
            onChange={userDtoChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="nickname"
            value={userDto.nickname}
            placeholder="닉네임"
            onChange={userDtoChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={userDto.password}
            placeholder="비밀번호"
            onChange={userDtoChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={userDto.confirmPassword}
            placeholder="비밀번호 확인"
            onChange={userDtoChange}
          />
        </div>
        <div>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
