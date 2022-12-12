import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { ImHome, ImUser, ImCogs, ImClipboard } from 'react-icons/im';
import { HiUserAdd } from 'react-icons/hi';
import { slideMenuState, nickNameState, loginState } from '../../states/recoilState';
import UserAuthIcon from './UserAuthIcon';
import { token, userId } from '../../assets/utils/common';
import UserIcon from './UserIcon';

function SlideMenu() {
  const node = useRef<HTMLDivElement>(null);

  const [slideMenu, setSlideMenu] = useRecoilState(slideMenuState);
  const [isLoggedIn, setLoggedIn] = useRecoilState(loginState);
  const [nickNameValue, setNickName] = useRecoilState(nickNameState);

  const navList = [
    { icon: <ImHome />, text: 'Home', link: '/', id: 1 },
    { icon: <ImClipboard />, text: 'Board', link: '/posts', id: 2 },
    { icon: <ImCogs />, text: 'Edit', link: '/settings', id: 3 },
  ];
  const SIGNUP_ICON = {
    icon: <HiUserAdd />,
    text: 'Sign up',
  };
  const LOGIN_ICON = {
    icon: <ImUser />,
    text: nickNameValue,
  };
  useEffect(() => {
    userId &&
      axios
        .get(`http://localhost:3000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setNickName(res.data.nick_name);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('login-token');
            localStorage.removeItem('user-id');
            setLoggedIn(false);
          }
        });
  }, []);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (slideMenu && node.current && !node.current.contains(target)) {
        setSlideMenu(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [slideMenu]);

  function clickSlideMenu() {
    setSlideMenu(!slideMenu);
  }
  function clickIcon(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setSlideMenu(false);
  }
  return (
    <>
      <SlideMenuContainer onClick={clickSlideMenu} ref={node}>
        <div className={slideMenu ? 'slideOn slide-container' : 'slideOff slide-container'}>
          <div className="white mb-80" onClick={clickIcon}>
            {isLoggedIn ? (
              <UserIcon icon={LOGIN_ICON.icon} userText={LOGIN_ICON.text} />
            ) : (
              <Link to="/signup">
                <UserIcon icon={SIGNUP_ICON.icon} userText={SIGNUP_ICON.text} />
              </Link>
            )}
          </div>
          <nav>
            <ul>
              {navList.map((data) => {
                return (
                  <li className="white" onClick={clickIcon} key={data.id}>
                    <Link to={data.link}>
                      <div className="nav-icon">{data.icon}</div>
                      <span className="nav-text">{data.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <UserAuthIcon clickIcon={clickIcon} />
        </div>
      </SlideMenuContainer>
    </>
  );
}
const SlideMenuContainer = styled.div`
  position: fixed;
  left: 0;
  padding: 30px 10px;
  height: 100vh;
  box-shadow: -1px 5px 10px 1px #ddd;
  background: ${(props) => props.theme.colors.mainBlue};
  border-radius: 0 10px 0 0;
  z-index: 999;
  svg {
    font-size: 26px;
    color: ${(props) => props.theme.colors.iconColor};
    :hover {
      color: ${(props) => props.theme.colors.darkBlue};
    }
  }
  .white {
    white-space: nowrap;
    cursor: pointer;
    :hover {
    }
  }
  .slideOff {
    width: 40px;
    overflow: hidden;
  }
  .slideOn {
    width: 150px !important;
  }

  .logout {
    display: inline-block;
    height: 35px;
    margin-right: 10px;
    svg {
      font-size: 30px;
      color: ${(props) => props.theme.colors.iconColor};
      transform: translateY(9px);
      :hover {
        color: ${(props) => props.theme.colors.darkBlue};
      }
    }
  }
  .nav-icon {
    display: inline-block;
    width: 40px;
    margin-bottom: 15px;
    text-align: center;

    svg {
      transform: translateY(7px);
    }
    :nth-last-child(1) {
      margin-bottom: none;
    }
  }
  .nav-text {
    display: inline-block;
    padding: 2px 40px 2px 0;
    margin-left: 20px;
    color: ${(props) => props.theme.colors.subGray};
    :hover {
      color: ${(props) => props.theme.colors.darkBlue};
    }
  }
  @media screen and (max-width: 640px) {
    padding: 10px 30px;
    bottom: 0;
    width: 100%;
    height: fit-content;
    border-radius: 10px 10px 0 0;
    .slide-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    nav ul {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .slideOff {
      width: 100%;
      height: 40px;
      overflow: hidden;
    }
    .slideOn {
      width: 100% !important;
      height: 40px;
      overflow: hidden;
    }
    .user-text {
      display: none !important;
    }
    .nav-icon {
      :nth-last-child(1) {
        margin-right: 0;
      }
    }
    .mt-30 {
      margin-top: 0;
    }
    .mb-80 {
      margin-bottom: 0px;
    }
    .user {
      margin-bottom: 0;
    }
    .logout {
      margin-top: 0;
      margin-right: 0;
      svg {
        transform: translateY(0px);
      }
    }
    .nav-text {
      display: none;
    }
  }
`;
export default SlideMenu;
