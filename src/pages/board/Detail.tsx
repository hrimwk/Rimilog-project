import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../states/recoilState';
import NotLoggedIn from '../../components/common/NotLoggedIn';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../../components/PostForm';
import { userId } from '../../assets/utils/common';
import PostEdit from '../../components/common/detail/PostEdit';

interface Postcontent {
  title: string;
  body: string;
  date: string;
  userId: string;
  time: string;
  id: number | null;
}
function PostDetai() {
  const [postContent, setContent] = useState<Postcontent>({
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
  const params = useParams();
  const postId = params.id;

  const contentTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };
  function toHtml() {
    return { __html: postContent.body };
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${postId}`, {}).then((res) => {
      setContent(res.data);
    });
  }, [edit]);

  return loggedInValue ? (
    <NewPostContainer>
      <div className="container">
        <div className="d-flex post-header">
          <p className="mb-10 wrriten-time">
            Written day : <span>{postContent.time}</span>
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
  @media screen and (max-width: 640px) {
    .ql-container {
      height: 380px;
    }
  }
`;

export default PostDetai;
