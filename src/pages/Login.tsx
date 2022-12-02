import { useState } from 'react';
import styled from 'styled-components';
import UserAuth from '../components/UserAuth';
import { AuthFomType } from './SignUp';
interface Auth {
  email: string;
  password: string;
  nick_name?: string;
}
function Login() {
  const [authInput, setLogin] = useState<Auth>({
    email: '',
    password: '',
  });
  const formList: AuthFomType[] = [
    { label: '아이디', value: 'id', id: 1, name: 'email', placeHolder: '아이디(이메일)를 입력해주세요.', type: 'text' },
    {
      label: '비밀번호',
      value: 'pw',
      id: 3,
      name: 'password',
      placeHolder: '비밀번호를 입력해주세요.',
      type: 'password',
    },
  ];
  const buttonString: string = '로그인';

  return (
    <LoginContainer>
      <UserAuth
        formList={formList}
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
