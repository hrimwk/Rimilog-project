import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

import { loginState } from '../states/recoilState';
import NotLoggedIn from '../components/common/NotLoggedIn';
import PostForm from '../components/write/WriteEditer';
import { time, today } from '../assets/utils/common';

function NewPost() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const getTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const loggedInValue = useRecoilValue(loginState);
  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: title,
      body: content,
      date: today,
      time: time,
      userId: localStorage.getItem('user-id'),
    };
    axios.post('http://localhost:3000/posts', data, {}).then((res) => {
      alert('게시글 작성이 완료되었습니다.');
      navigate(`/posts/detail/${res.data.id}`);
    });
  };

  return loggedInValue ? (
    <NewPostContainer>
      <div className="container">
        <form onSubmit={formSubmit}>
          <h1 className="title">NEW POST</h1>
          <p className="mb-10">
            Written day :
            <span>
              {today}&nbsp;
              {time}
            </span>
          </p>
          <input className="post-title" type="text" placeholder="제목을 입력해주세요." onChange={getTitle} />
          <PostForm content={content} setContent={setContent} />
          <div className="button-area">
            <button type="reset">cancel</button>
            <button type="submit">post</button>
          </div>
        </form>
      </div>
    </NewPostContainer>
  ) : (
    <NotLoggedIn />
  );
}
const NewPostContainer = styled.div`
  .post-title {
    width: 100%;
    padding: 15px 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
  .button-area {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    button {
      border: none;
      border-radius: 5px;
      padding: 10px;
      cursor: pointer;
      :nth-child(1) {
        margin-right: 10px;
      }
      :hover {
        background: #ccc;
      }
    }
  }
  @media screen and (max-width: 640px) {
  }
`;

export default NewPost;
