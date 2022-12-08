import { useState } from 'react';
import styled from 'styled-components';
import { loginFormList } from '../assets/utils/login';
import { Auth } from '../assets/utils/signup';
import UserAuth from '../components/UserAuth';

function Login() {
  const [authInput, setLogin] = useState<Auth>({
    email: '',
    password: '',
  });

  const buttonString: string = '로그인';

  return (
    <LoginContainer>
      <UserAuth
        formList={loginFormList}
        buttonString={buttonString}
        setAuth={setLogin}
        authInput={authInput}
        postMethod="login"
      />
    </LoginContainer>
  );
}
const LoginContainer = styled.div``;
export default Login;
