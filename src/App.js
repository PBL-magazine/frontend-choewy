import { useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import UserActions from './actions/UserActions';
import Header from './components/Header';
import PostDetailPage from './components/PostDetailPage';
import PostEditPage from './components/PostEditPage';
import PostsPage from './components/PostsPage';
import PostWritePage from './components/PostWritePage';
import SigninPage from './components/SigninPage';
import SignupPage from './components/SignupPage';
import SignoutPage from './components/SignoutPage';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthrization = async () => {
      const { ok, user } = await UserActions.authorize();
      if (ok) return setUser(user);
      setUser(false);
    };
    checkAuthrization();
    return () => {};
  }, []);

  if (user === null) return <></>;

  const HeaderProps = { user };
  const PostPageProps = { user };
  const PostDetailPageProps = { user };

  return (
    <div className="app">
      <Header {...HeaderProps} />
      <Routes>
        <Route path="/" element={<PostsPage {...PostPageProps} />} />
        <Route
          path="/post/write"
          element={user ? <PostWritePage /> : <Navigate to="/" />}
        />
        <Route
          path="/post/:post_id/edit"
          element={user ? <PostEditPage /> : <Navigate to="/" />}
        />
        <Route
          path="/post/:post_id"
          element={<PostDetailPage {...PostDetailPageProps} />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SigninPage />}
        />
        <Route
          path="/signout"
          element={user ? <SignoutPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
