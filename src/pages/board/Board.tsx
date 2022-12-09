import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NotLoggedIn from '../../components/common/NotLoggedIn';
import Pagination from '../../components/common/Pagination';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../states/recoilState';
import { today, userId } from '../../assets/utils/common';

interface list {
  id: number;
  title: string;
  writer?: string;
  date?: string;
  time?: string;
}
function Board() {
  const navigate = useNavigate();
  const [list, setList] = useState<list[]>([]);
  const limit: number = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const loggedInValue = useRecoilValue(loginState);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts?_sort=id&_order=desc&userId=${userId}`).then((res) => {
      setList(res.data);
    });
  }, []);
  return loggedInValue ? (
    <BoardContainer>
      <div className="container">
        <div className="boardWrap">
          <h1 className="title">BOARD</h1>
          <ul className="list-head d-flex">
            <li className="num">No</li>
            <li className="list-title">Title</li>
            <li className="date">date</li>
          </ul>
          {list.length === 0 ? (
            <p>no posts</p>
          ) : (
            <ul>
              {list.slice(offset, offset + limit).map((data, idx) => {
                return (
                  <li key={data.id}>
                    <ul className="list-body d-flex">
                      <li className="num">{list.length - idx - offset}</li>
                      <li className="list-title body" onClick={() => navigate(`/board/detail/${data.id}`)}>
                        {data.title}
                      </li>
                      {today === data.date ? (
                        <li className="date">{data.time}</li>
                      ) : (
                        <li className="date">{data.date}</li>
                      )}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="pagination-area">
            <button
              className="new-post"
              onClick={() => {
                navigate('newpost');
              }}>
              new post
            </button>
            <Pagination total={list.length} limit={limit} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </BoardContainer>
  ) : (
    <NotLoggedIn />
  );
}
const BoardContainer = styled.div`
  .boardWrap {
    position: relative;
    padding-bottom: 100px;
    min-height: 700px;
  }
  .list-head {
    padding: 10px;
    background: #f3f5f8;
    border-radius: 10px;
    li {
      padding: 5px;
    }
  }
  .list-body {
    padding: 10px;
    border-bottom: 1px solid #f3f5f8;

    li {
      padding: 5px;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .num {
    width: 50px;
  }
  .list-title {
    flex: 5 5;
  }
  .list-title.body {
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  .date {
    flex: 1 1;
    text-align: center;
  }

  .pagination-area {
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    button.new-post {
      position: absolute;
      top: -10px;
      right: 0;
      padding: 10px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      :hover {
        background-color: #ccc;
      }
    }
  }
  @media screen and (max-width: 640px) {
    .list-head {
      flex-direction: row !important;
    }
    .category {
      display: none;
    }
    .date {
      display: none;
    }
    .list-body {
      flex-direction: row !important;
      .list-title {
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .boardWrap {
    min-height: 550px;
  }
`;
export default Board;
