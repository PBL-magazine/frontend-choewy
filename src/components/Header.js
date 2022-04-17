import { Link } from 'react-router-dom';

const Header = (props) => {
  const { user } = props;

  if (user === null) return <></>;

  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        {!user && (
          <li>
            <Link to="/signin">로그인</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/post/write">글작성</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/signout">로그아웃</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
