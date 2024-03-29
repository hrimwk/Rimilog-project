import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dompurify from 'dompurify';
import { useRecoilValue } from 'recoil';

import { loginState } from '../states/recoilState';
import NotLoggedIn from '../components/common/NotLoggedIn';
import PostForm from '../components/write/WriteEditer';
import { today } from '../assets/utils/common';
import PostEdit from '../components/post/EditButton';
import { BsArrowLeftShort } from 'react-icons/bs';

function PostDetai() {
  const sanitizer = dompurify.sanitize;
  const [postContent, setContent] = useState({
    title: '',
    body: '',
    date: '',
    userId: '',
    time: '',
    id: null,
  });
  const [editContent, setEditContent] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [edit, setEdit] = useState(false);
  const loggedInValue = useRecoilValue(loginState);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const userId = localStorage.getItem('user-id');

  const contentTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };
  function toHtml() {
    return { __html: sanitizer(postContent.body) };
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/posts/${postId}`, {}).then((res) => {
      setContent(res.data);
    });
  }, [edit]);
  function goBack() {
    navigate(-1);
  }
  return loggedInValue ? (
    <NewPostContainer>
      <div className='container'>
        <div className='post-header'>
          <p className='wrriten-time'>
            Written day :&nbsp;
            {postContent.date === today ? <span>today&nbsp;{postContent.time}</span> : <span>{postContent.date}</span>}
          </p>
          {userId === postContent.userId && (
            <PostEdit
              edit={edit}
              setEdit={setEdit}
              editTitle={editTitle}
              editContent={editContent}
              setEditContent={setEditContent}
              setEditTitle={setEditTitle}
              postContent={postContent}
            />
          )}
        </div>
        <div className='go-back' onClick={goBack}>
          <BsArrowLeftShort />
        </div>
        {edit ? (
          <input className='post-title edit' defaultValue={postContent.title} onChange={contentTitleChange} />
        ) : (
          <h1 className='post-title title'>{postContent.title}</h1>
        )}
        {edit ? <PostForm content={editContent} setContent={setEditContent} /> : <div className='post-content' dangerouslySetInnerHTML={toHtml()} />}
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
    line-height: 30px;
  }
  .post-title.edit {
    padding-left: 10px;
    margin-right: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .wrriten-time {
    font-size: 14px;
    color: #aaa;
  }
  .post-content {
    min-height: 450px;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    p,
    h1,
    h2 {
      margin-bottom: 10px;
    }
  }
  .go-back {
    cursor: pointer;

    svg {
      font-size: 30px;
      :hover {
        color: #aaa;
      }
    }
  }
  @media screen and (max-width: 640px) {
    .ql-container {
      height: 380px;
    }
  }
`;

export default PostDetai;
