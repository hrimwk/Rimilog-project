import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';

import { loginState, nickNameState } from '../states/recoilState';
import NotLoggedIn from '../components/common/NotLoggedIn';
import { token, userId } from '../assets/utils/common';
import { ImUser } from 'react-icons/im';

function EditUser() {
  const loggedInValue = useRecoilValue(loginState);
  const [userInfo, setUser] = useState<string>();
  const [nickNameValue, setNickName] = useRecoilState(nickNameState);
  const writeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const editSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      nick_name: userInfo,
    };
    axios
      .patch(`http://localhost:3000/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert('수정이 완료되었습니다.');
        setNickName(res.data.nick_name);
      });
  };

  return loggedInValue ? (
    <EditUserContainer className="container">
      <h1 className="title">User INFO</h1>
      <div className="profile-icon">
        <ImUser />
      </div>
      <form onSubmit={editSubmit}>
        <label className="form-title">User name</label>
        <input type="text" defaultValue={nickNameValue} onChange={writeNickName} />
        <span className="explanation">write your own nick name!</span>
        <button type="submit">edit</button>
      </form>
    </EditUserContainer>
  ) : (
    <NotLoggedIn />
  );
}
const EditUserContainer = styled.div`
  .profile-icon {
    text-align: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #ddd;
    margin: 50px auto;
    svg {
      font-size: 70px;
      transform: translateY(9px);
    }
  }
  form {
    flex-grow: 1;
    max-width: 300px;
    margin: 0 auto;

    label.form-title {
      margin-bottom: 3px;
    }
    input {
      display: block;
      width: 100%;
      padding: 10px 5px;
      margin-bottom: 25px;
      border: 1px solid #ddd;
      border-width: 0 0 1px 0;
    }
    .explanation {
      display: block;
      text-align: center;
      color: ${(props) => props.theme.colors.pointBlue};
    }
    button {
      margin-top: 50px;
      padding: 10px;
      width: 100%;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      :hover {
        background: #ddd;
      }
    }
  }
`;
export default EditUser;
