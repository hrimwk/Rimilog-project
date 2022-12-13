import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { loginState, nickNameState } from '../../states/recoilState';
import { Auth, AuthFomType } from '../../assets/utils/signup';
import { useState, useEffect } from 'react';

type PropsType = {
  formList: AuthFomType[];
  buttonString: string;
  setAuth: (data: Auth) => void;
  authInput: Auth;
  postMethod: string;
};

function UserAuth(props: PropsType) {
  const { formList, buttonString, setAuth, authInput, postMethod } = props;

  const [confirmPw, setConfirmPw] = useState('');
  const [pwMatched, setPwMatched] = useState(true);
  const [emailFormat, setEmailFormat] = useState(true);
  const setLoggedIn = useSetRecoilState(loginState);
  const setNickName = useSetRecoilState(nickNameState);
  const navigate = useNavigate();

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAuth({ ...authInput, [e.target.name]: e.target.value });
  }
  function ChangeConfirmPw(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPw(e.target.value);
  }

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
          setLoggedIn(true);
          alert('로그인이 완료되었습니다.');
          setNickName(res.data.user.nick_name);
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
  useEffect(() => {
    if (confirmPw !== authInput.password) {
      setPwMatched(false);
    } else {
      setPwMatched(true);
    }
  }, [confirmPw]);

  useEffect(() => {
    if (authInput.email.match(/[\w\-\.]+\@[\w\-\.]+/g)) {
      setEmailFormat(true);
    } else if (authInput.email.length > 0 && authInput.email.match(/[\w\-\.]+\@[\w\-\.]+/g) === null) {
      setEmailFormat(false);
    }
  }, [authInput.email]);

  return (
    <UserAuthContainer className='container d-flex-center'>
      <form onSubmit={formSubmit}>
        <ul>
          {formList.map((data: AuthFomType) => {
            return (
              <li className='input-wrap' key={data.id}>
                <label>{data.label}</label>
                <input type={data.type} name={data.name} onChange={inputChange} placeholder={data.placeHolder} required />
                {emailFormat === false && <p className='alert-message-red'>{data.alert}</p>}
              </li>
            );
          })}
          {postMethod === 'signup' && (
            <li>
              <label>비밀번호 확인</label>
              <input type='password' name='confirmPassword' onChange={ChangeConfirmPw} placeholder='비밀번호를 다시입력해주세요.' />
            </li>
          )}
          {pwMatched === false && <p className='alert-message-red'>비밀번호가 일치하지 않습니다.</p>}
        </ul>

        <button type='submit'>{buttonString}</button>
        {postMethod === 'login' ? (
          <span className='ask'>
            혹시 회원이 아니신가요?&nbsp;<Link to='/signup'>회원가입</Link>
          </span>
        ) : (
          <span className='ask'>
            혹시 회원이신가요?&nbsp;<Link to='/login'>로그인</Link>
          </span>
        )}
      </form>
    </UserAuthContainer>
  );
}
const UserAuthContainer = styled.div`
  .alert-message-red {
    padding: 5px;
    color: #ca0000;
    font-size: 14px;
  }
  form {
    flex-grow: 1;
    max-width: 400px;
    margin: 0 auto;
  }
  .input-wrap {
    margin-bottom: 25px;
  }
  label {
    display: block;
    margin-bottom: 3px;
  }
  input {
    display: block;
    width: 100%;
    padding: 10px;
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
