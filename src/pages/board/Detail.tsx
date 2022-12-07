import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../states/recoilState';
import NotLoggedIn from '../../components/common/NotLoggedIn';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../../components/PostForm';

function PostDetai() {
  const [postContent, setContent] = useState([{ title: '', body: '', date: '', userId: '', time: '', id: '' }]);
  const [editContent, setEditContent] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [edit, setEdit] = useState(false);
  const loggedInValue = useRecoilValue(loginState);
  const params = useParams();
  const postId = params.id;
  const navigate = useNavigate();

  const clickEdit = () => {
    setEdit(true);
    setEditContent(postContent.body);
    setEditTitle(postContent.title);
  };
  const contentTitleChange = (e: React.ChangeEvent) => {
    setEditTitle(e.target.value);
  };
  const clickConfirm = () => {
    const data = {
      title: editTitle,
      body: editContent,
    };
    axios.patch(`http://localhost:3000/posts/${postId}`, data).then((res) => {
      console.log(res);
      setEdit(false);
    });
  };
  const clickDelete = () => {
    confirm('삭제하시겠습니까?') &&
      axios.delete(`http://localhost:3000/posts/${postId}`).then((res) => {
        console.log(res);
        navigate('/board');
      });
  };
  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${postId}`, {}).then((res) => {
      setContent(res.data);
    });
  }, [edit]);

  function toHtml() {
    return { __html: postContent.body };
  }

  return loggedInValue ? (
    <NewPostContainer>
      <div className="container">
        <div className="d-flex post-header">
          <p className="mb-10 wrriten-time">
            Written day : <span>{postContent.time}</span>
          </p>
          <div className="post-option-area d-flex">
            {edit ? (
              <>
                <span onClick={clickConfirm}>confirm</span>
                <span
                  onClick={() => {
                    setEdit(false);
                  }}>
                  cancel
                </span>
              </>
            ) : (
              <span onClick={clickEdit}>edit</span>
            )}
            <span onClick={clickDelete}>delete</span>
          </div>
        </div>
        {edit ? (
          <input className="post-title edit" defaultValue={postContent.title} onChange={contentTitleChange} />
        ) : (
          <h1 className="post-title title">{postContent.title}</h1>
        )}
        {edit ? (
          <PostForm content={editContent} setContent={setEditContent} />
        ) : (
          <div className="post-content" dangerouslySetInnerHTML={toHtml()} />
        )}
      </div>
    </NewPostContainer>
  ) : (
    <NotLoggedIn />
  );
}
const NewPostContainer = styled.div`
  .post-title {
    width: 100%;
    padding: 15px 0px;
    margin-bottom: 10px;
  }
  .post-title.edit {
    padding-left: 10px;
    margin-right: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .post-header {
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
  .post-option-area {
    span {
      flex-grow: 1;
      display: block;
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
      &:nth-last-child(1) {
        margin-right: 0px;
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
