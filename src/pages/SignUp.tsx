import { useState } from 'react';
import styled from 'styled-components';
import UserAuth from '../components/UserAuth';

export interface AuthFomType {
  label: string;
  value: string;
  id: number;
  name: string;
  placeHolder: string;
  type: string;
}
export interface Auth {
  email: string;
  password: string;
  nick_name?: string;
}
function SignUp() {
  const [authInput, setAuth] = useState<Auth>({
    email: '',
    password: '',
    nick_name: '',
  });
  const formList: AuthFomType[] = [
    { label: '아이디', value: 'id', id: 1, name: 'email', placeHolder: '이메일 형식으로 작성해주세요.', type: 'text' },
    {
      label: '닉네임',
      value: 'nick_name',
      id: 2,
      name: 'nick_name',
      placeHolder: '사용할 이름을 설정해주세요.',
      type: 'text',
    },
    {
      label: '비밀번호',
      value: 'pw',
      id: 3,
      name: 'password',
      placeHolder: '비밀번호를 입력해주세요.',
      type: 'password',
    },
    {
      label: '비밀번호 확인',
      value: 'pwconfirm',
      id: 4,
      name: 'confirmPassword',
      placeHolder: '비밀번호을 다시 입력해주세요.',
      type: 'password',
    },
  ];
  const buttonString: string = '가입하기';

  return (
    <SignupContainer>
      <UserAuth
        formList={formList}
        buttonString={buttonString}
        setAuth={setAuth}
        authInput={authInput}
        postMethod="register"
      />
    </SignupContainer>
  );
}
const SignupContainer = styled.div``;
export default SignUp;
