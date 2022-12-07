import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainPostList from '../components/home/MainPostList';
import { MdOutlineWavingHand } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { loginState, nickNameState } from '../states/recoilState';

function Home() {
  const [weeklyBest, setWeekly] = useState([]);
  const [mainData, setData] = useState([]);

  const loggedInValue = useRecoilValue(loginState);
  const nickNameValue = useRecoilValue(nickNameState);

  useEffect(() => {
    axios.get('http://localhost:3000/weeklyBest').then((res) => {
      setWeekly(res.data);
    });
    // axios.get('/data/bestComment.json').then((res) => {
    //   setData(res.data.bestComment);
    // });
  }, []);
  return (
    <MainContainer>
      <div className="container">
        <section className="welcome">
          <h1 className="greeting">
            Hello {loggedInValue && <span className="point-color">{nickNameValue}</span>}&nbsp;
            <MdOutlineWavingHand />
            &nbsp;&nbsp; Welcome to RIMILOG
          </h1>
          {loggedInValue ? (
            <p className="app-info">Are you having a good day? Record your day with RIMILOG</p>
          ) : (
            <p className="app-info">RIMILOG is a web application where you can keep a diary every day</p>
          )}
        </section>
        <section className="best-area d-flex">
          <MainPostList listData={weeklyBest} />
        </section>
      </div>
    </MainContainer>
  );
}
const MainContainer = styled.div`
  .welcome {
    padding: 50px;
    margin-bottom: 50px;
    background: ${(props) => props.theme.colors.mainBlue};
    border-radius: 5px;
    .point-color {
      color: ${(props) => props.theme.colors.pointBlue};
    }
    .greeting {
      margin-bottom: 20px;
      color: ${(props) => props.theme.colors.darkBlue};
      font-size: 30px;
    }
    .app-info {
      color: ${(props) => props.theme.colors.subGray};
    }
  }
  @media screen and (max-width: 640px) {
    .welcome {
      padding: 20px;
      .greeting {
        margin-bottom: 20px;
        color: ${(props) => props.theme.colors.darkBlue};
        font-size: 25px;
      }
      .app-info {
        font-size: 13px;
      }
    }
  }
`;
export default Home;
