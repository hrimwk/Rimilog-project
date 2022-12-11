import { useMemo } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

import { FORMATS } from '../assets/utils/postFom';
import 'react-quill/dist/quill.snow.css';

type PropsType = {
  content: string;
  setContent: (data: string) => void;
};
function PostForm(props: PropsType) {
  const { content, setContent } = props;

  const getContent = (value: string) => {
    setContent(value);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: 1 }, { header: 2 }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block'],
        ],
      },
    }),
    []
  );

  return (
    <PostContainer>
      <ReactQuill
        formats={FORMATS}
        value={content}
        onChange={getContent}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력하세요."
      />
    </PostContainer>
  );
}
const PostContainer = styled.div`
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
  @media screen and (max-width: 640px) {
    .ql-container {
      height: 380px;
    }
    .ql-toolbar button {
      width: 26px;
    }
  }
`;

export default PostForm;
