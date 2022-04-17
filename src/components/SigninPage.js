import { useState } from 'react';
import UserActions from '../actions/UserActions';

const SigninPage = () => {
  const [userDto, setUserDto] = useState({
    email: '',
    password: '',
  });

  const userDtoChange = (e) => {
    const {
      target: { name, value },
    } = e;

    setUserDto({ ...userDto, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = userDto;

    if (!email) return alert('이메일 형식을 확인하세요.');
    if (!password) return alert('이메일 형식을 확인하세요.');

    const { ok, message } = await UserActions.signin(userDto);
    if (!ok) return alert(message);
    window.location.pathname = '/';
  };

  return (
    <div className="container">
      <h1>로그인 페이지</h1>
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
            type="password"
            name="password"
            value={userDto.password}
            placeholder="비밀번호"
            onChange={userDtoChange}
          />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;
