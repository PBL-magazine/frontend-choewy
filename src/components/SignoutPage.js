import { useEffect } from 'react';
import UserActions from '../actions/UserActions';

const SignoutPage = () => {
  useEffect(() => {
    const signout = async () => {
      await UserActions.signout();
      window.location.pathname = '/signin';
    };
    signout();
    return () => {};
  }, []);

  return <></>;
};

export default SignoutPage;
