import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Postcontent {
  title: string;
  body: string;
  date: string;
  userId: string;
  time: string;
  id: number | null;
}
type PropsType = {
  edit: boolean;
  setEdit: (data: boolean) => void;
  editTitle: string;
  editContent: string;
  setEditContent: (data: string) => void;
  setEditTitle: (data: string) => void;
  postContent: Postcontent;
};

function PostEdit(props: PropsType) {
  const { edit, setEdit, editTitle, editContent, setEditContent, setEditTitle, postContent } = props;
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  const clickEdit = () => {
    setEdit(true);
    setEditContent(postContent.body);
    setEditTitle(postContent.title);
  };
  const clickConfirm = () => {
    const data = {
      title: editTitle,
      body: editContent,
    };
    axios.patch(`http://localhost:3000/posts/${postId}`, data).then((res) => {
      setEdit(false);
    });
  };
  const clickDelete = () => {
    confirm('삭제하시겠습니까?') &&
      axios.delete(`http://localhost:3000/posts/${postId}`).then((res) => {
        navigate('/posts');
      });
  };

  return (
    <EditContainer>
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
    </EditContainer>
  );
}
const EditContainer = styled.div`
  display: flex;
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
`;
export default PostEdit;
