import { useState } from 'react';

import { Auth, formList } from '../assets/utils/signup';
import UserAuth from '../components/userAuth/UserAuth';

function SignUp() {
  const [authInput, setAuth] = useState<Auth>({
    email: '',
    password: '',
    nick_name: '',
  });

  const buttonString: string = '가입하기';

  return (
    <>
      <UserAuth formList={formList} buttonString={buttonString} setAuth={setAuth} authInput={authInput} postMethod='signup' />
    </>
  );
}

export default SignUp;
