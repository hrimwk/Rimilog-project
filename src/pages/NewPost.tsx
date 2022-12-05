import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '../states/recoilState';
import NotLoggedIn from '../components/NotLoggedIn';

function NewPost() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const getContent = (value: string) => {
    setContent(value);
  };
  const getTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const loggedInValue = useRecoilValue(loginState);
  const formSubmit = (e: React.FormEvent) => {
    const minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    const hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
    const time = `${hours}:${minutes}`;
    const month = new Date().getMonth() + 1 < 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
    const date = new Date().getDate() + 1 < 9 ? '0' + new Date().getDate() : new Date().getDate() + 1;
    const today = `${new Date().getFullYear()}-${month}-${date}`;
    e.preventDefault();

    const data = {
      title: title,
      body: content,
      date: today,
      time: time,
    };
    axios.post('http://localhost:3000/posts', data, {
      // headers: {
      //   Authorization:
      //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMUBlbWFpbC5jb20iLCJpYXQiOjE2NzAxMzIzNjQsImV4cCI6MTY3MDEzNTk2NCwic3ViIjoiNjRtSUJOaCJ9.viAl2g-bEn4bFkEShVb2Dnf38hUREliqzgdTDL5BjyY',
      // },
    });
    // .then((res) => {
    //   alert("게시글 작성이 완료되었습니다.");
    //   navigate(`/board/detail/${res.data.post_id}`);
    // });
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'ordered',
    'bullet',
    'blockquote',
    'link',
    'code-block',
  ];
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: 1 }, { header: 2 }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'link', 'code-block'],
        ],
      },
    }),
    []
  );

  return loggedInValue ? (
    <NewPostContainer>
      <div className="container">
        <form onSubmit={formSubmit}>
          <h1 className="title">NEW POST</h1>
          <input className="post-title" type="text" placeholder="제목을 입력해주세요." onChange={getTitle} />
          <ReactQuill
            formats={formats}
            value={content}
            onChange={getContent}
            modules={modules}
            theme="snow"
            placeholder="내용을 입력하세요."
          />
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
  .ql-toolbar {
    border-radius: 10px 10px 0 0;
    border-color: #ddd !important;
    border-bottom: 1px solid #ddd !important;
    background: rgb(249 250 251);
  }
  .ql-container {
    height: 450px;
    border-color: #ddd !important;
    border-radius: 0 0 10px 10px;
  }
  .ql-editor {
    font-size: 14px;
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
    .ql-container {
      height: 380px;
    }
  }
`;

export default NewPost;
