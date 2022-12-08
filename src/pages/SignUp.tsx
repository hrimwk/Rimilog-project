import { useState } from 'react';
import styled from 'styled-components';
import { Auth, formList } from '../assets/utils/signup';
import UserAuth from '../components/UserAuth';

function SignUp() {
  const [authInput, setAuth] = useState<Auth>({
    email: '',
    password: '',
    nick_name: '',
  });

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
