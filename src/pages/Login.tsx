import { useState } from 'react';

import { loginFormList } from '../assets/utils/login';
import { Auth } from '../assets/utils/signup';
import UserAuth from '../components/userAuth/UserAuth';

function Login() {
  const [authInput, setLogin] = useState<Auth>({
    email: '',
    password: '',
  });

  const buttonString: string = '로그인';

  return (
    <>
      <UserAuth
        formList={loginFormList}
        buttonString={buttonString}
        setAuth={setLogin}
        authInput={authInput}
        postMethod="login"
      />
    </>
  );
}

export default Login;
