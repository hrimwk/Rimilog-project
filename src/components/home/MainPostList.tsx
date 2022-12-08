import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface listData {
  id: number;
  title: string;
}
type PropsType = {
  categoryTitle: string;
  listData: listData[];
};

function MainPostList({ listData, categoryTitle }: PropsType) {
  const navigate = useNavigate();
  return (
    <MainPostListContiner>
      <h1 className="title">{categoryTitle}</h1>
      <ul>
        {listData.map((data, idx) => {
          return (
            <li key={data.id}>
              <div className="content-title d-flex">
                <p className="num">{idx + 1}</p>
                <p className="list-title body" onClick={() => navigate(`/board/detail/${data.id}`)}>
                  {data.title}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </MainPostListContiner>
  );
}
const MainPostListContiner = styled.div`
  flex-grow: 1;
  margin-right: 4%;
  &:last-child {
    margin-right: 0;
  }
  li {
    padding: 15px 10px;
    border-bottom: 1px solid #ddd;
    :nth-last-child(1) {
      margin-bottom: none;
      border-bottom: none;
    }
  }
  .num {
    width: 50px;
  }
  .list-title {
    flex: 1 1;
  }
  .list-title.body {
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  @media screen and (max-width: 640px) {
    margin-right: 0;

    .best-comment {
      flex-grow: 1;
      li {
        .comment {
          width: 100%;
          margin-left: 0;
        }
        span {
          margin-bottom: 15px;
        }
      }
    }
  }
`;
export default MainPostList;
