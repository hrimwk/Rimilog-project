import styled from 'styled-components';
import { ImHome, ImUser, ImCogs, ImClipboard } from 'react-icons/im';
import { CiLogin } from 'react-icons/ci';
import { HiUserAdd } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { sideMenuType } from '../App';
import React, { useEffect, useRef } from 'react';

function SlideMenu({ sideMenu, setSideMenu }: sideMenuType) {
  const node = useRef<HTMLDivElement>(null);
  const navList = [
    { icon: <ImHome />, text: 'Home', link: '/', id: 1 },
    { icon: <ImClipboard />, text: 'Board', link: '/board', id: 2 },
    { icon: <ImCogs />, text: 'Edit', link: '/', id: 3 },
  ];
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (sideMenu && node.current && !node.current.contains(target)) {
        setSideMenu(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [sideMenu]);

  function clickSlideMenu() {
    setSideMenu(!sideMenu);
  }
  function clickIcon(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setSideMenu(false);
  }
  return (
    <>
      <SlideMenuContainer onClick={clickSlideMenu} ref={node}>
        <div className={sideMenu ? 'slideOn slide-container' : 'slideOff slide-container'}>
          <div className="white mb-80" onClick={clickIcon}>
            <Link to="/signup">
              <div className="user flex-center">
                {/* <ImUser /> */}
                <HiUserAdd />
              </div>
              {/* <span className="nav-text">User</span> */}
              <span className="nav-text">Signup</span>
            </Link>
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
          <div className="white mt-30" onClick={clickIcon}>
            <Link to="/login">
              <div className="logout">
                <CiLogin />
              </div>
              <span className="nav-text">Login</span>
            </Link>
          </div>
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
  background: #dde5f0;
  border-radius: 0 10px 0 0;
  z-index: 999;
  svg {
    font-size: 26px;
    color: #8f959f;
  }
  .white {
    white-space: nowrap;
    cursor: pointer;
    :hover {
    }
  }
  .mb-80 {
    margin-bottom: 80px;
  }
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .slideOff {
    width: 40px;
    overflow: hidden;
  }
  .slideOn {
    width: 150px !important;
  }
  .user {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #4b5564;
    text-align: center;
    svg {
      transform: translateY(20%);
      color: #fff;
    }
  }
  .mt-30 {
    margin-top: 30px;
  }
  .logout {
    display: inline-block;

    svg {
      font-size: 30px;
      color: #8f959f;
      transform: translateY(9px);
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
    color: #777d87;
    :hover {
      color: #4b5564;
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
