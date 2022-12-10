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

function MainPostList(props: PropsType) {
  const { listData, categoryTitle } = props;
  const navigate = useNavigate();
  return (
    <MainPostListContiner>
      <h1 className="title">{categoryTitle}</h1>
      <ul>
        {listData.map((data, idx) => {
          return (
            <li key={data.id}>
              <div className="content-title">
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
  flex: 1 1;
  width: 50%;
  &:nth-child(odd) {
    margin: 0 10px 0 0;
  }
  &:nth-child(even) {
    margin: 0 0 0 10px;
  }
  .content-title {
    display: flex;
    justify-content: flex-start;
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
    width: fit-content;
    display: inline-block;
    margin-right: 30px;
  }
  .list-title {
    flex: 1 1;
  }
  .list-title.body {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  @media screen and (max-width: 640px) {
    margin: 0 0 30px 0 !important;
    width: 100%;
    .title {
      margin-bottom: 10px;
    }
  }
`;
export default MainPostList;
