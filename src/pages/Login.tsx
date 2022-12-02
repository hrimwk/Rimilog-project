import styled from 'styled-components';
import UserAuth from '../components/UserAuth';
import { AuthFomType } from './SignUp';

function Login() {
  const formList: AuthFomType[] = [
    { label: '아이디', value: 'id', id: 1 },
    { label: '비밀번호', value: 'pw', id: 3 },
  ];
  const buttonString: string = '로그인';

  return (
    <LoginContainer>
      <UserAuth formList={formList} buttonString={buttonString} />
    </LoginContainer>
  );
}
const LoginContainer = styled.div``;
export default Login;
