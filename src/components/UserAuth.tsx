import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useSetRecoilState } from 'recoil';
import { loginState, nickNameState } from '../states/recoilState';
import { Auth, AuthFomType } from '../assets/utils/signup';

type PropsType = {
  formList: AuthFomType[];
  buttonString: string;
  setAuth: (data: Auth) => void;
  authInput: Auth;
  postMethod: string;
};

function UserAuth({ formList, buttonString, setAuth, authInput, postMethod }: PropsType) {
  const setLoggedIn = useSetRecoilState(loginState);
  const setNickName = useSetRecoilState(nickNameState);
  const navigate = useNavigate();

  function formSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      ...authInput,
    };

    axios
      .post(`http://localhost:3000/${postMethod}`, data)
      .then((res) => {
        if (postMethod === 'login') {
          localStorage.setItem('login-token', res.data.accessToken);
          localStorage.setItem('user-id', res.data.user.id);
          setNickName(res.data.user.nick_name);
          setLoggedIn(true);
          console.log(res.data.user.nick_name);

          alert('로그인이 완료되었습니다.');
          navigate('/');
        } else {
          alert('회원가입이 완료되었습니다.');
          navigate('/login');
        }
      })
      .catch((error) => {
        if (postMethod === 'login') {
          alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
        }
      });
  }
  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAuth({ ...authInput, [e.target.name]: e.target.value });
  }

  return (
    <UserAuthContainer className="container d-flex-center">
      <form onSubmit={formSubmit}>
        <ul>
          {formList.map((data: AuthFomType) => {
            return (
              <li key={data.id}>
                <label>{data.label}</label>
                <input type={data.type} name={data.name} onChange={inputChange} placeholder={data.placeHolder} />
              </li>
            );
          })}
        </ul>

        <button type="submit">{buttonString}</button>
        {postMethod === 'login' ? (
          <span className="ask">
            혹시 회원이 아니신가요?&nbsp;<Link to="/signup">회원가입</Link>
          </span>
        ) : (
          <span className="ask">
            혹시 회원이신가요?&nbsp;<Link to="/login">로그인</Link>
          </span>
        )}
      </form>
    </UserAuthContainer>
  );
}
const UserAuthContainer = styled.div`
  form {
    flex-grow: 1;
    max-width: 400px;
    margin: 0 auto;
  }

  label {
    display: block;
    margin-bottom: 3px;
  }
  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 25px;
    border: 1px solid #ddd;
    border-width: 0 0 1px 0;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
  }
  .ask {
    display: block;
    padding: 30px 0;
    font-size: 14px;
    color: #333;
    text-align: center;
    a {
      text-decoration: underline;
      color: ${(props) => props.theme.colors.pointBlue};
    }
  }
`;
export default UserAuth;
