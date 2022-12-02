import styled from 'styled-components';
import UserAuth from '../components/UserAuth';

export interface AuthFomType {
  label: string;
  value: string;
  id: number;
}
function SignUp() {
  const formList: AuthFomType[] = [
    { label: '아이디', value: 'id', id: 1 },
    { label: '닉네임', value: 'nick_name', id: 2 },
    { label: '비밀번호', value: 'pw', id: 3 },
    { label: '비밀번호 확인', value: 'pwconfirm', id: 4 },
  ];
  const buttonString: string = '가입하기';

  return (
    <SignupContainer>
      <UserAuth formList={formList} buttonString={buttonString} />
    </SignupContainer>
  );
}
const SignupContainer = styled.div``;
export default SignUp;
