import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import { formats } from '../assets/utils/postFom';

type PropsType = {
  content: string;
  setContent: (data: string) => void;
};
function PostForm({ content, setContent }: PropsType) {
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
          ['blockquote', 'link', 'code-block'],
        ],
      },
    }),
    []
  );

  return (
    <PostContainer>
      <ReactQuill
        formats={formats}
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
  }
`;

export default PostForm;
