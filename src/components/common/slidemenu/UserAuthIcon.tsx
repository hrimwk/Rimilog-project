import { CiLogin, CiLogout } from 'react-icons/ci';
import { loginState } from '../../../states/recoilState';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { token } from '../../../assets/utils/common';

type PropsType = {
  clickIcon: (e: React.MouseEvent<HTMLElement>) => void;
};

function UserAuthIcon({ clickIcon }: PropsType) {
  const [isLoggedIn, setLoggedIn] = useRecoilState(loginState);
  const askLogout = () => {
    let isLogout = confirm('로그아웃하시겠습니까?');
    if (isLogout === true) {
      localStorage.removeItem('login-token');
      localStorage.removeItem('user-id');
      alert('로그아웃 되었습니다.');
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    token && setLoggedIn(true);
  }, []);

  return (
    <div className="white mt-30" onClick={clickIcon}>
      {isLoggedIn ? (
        <>
          <div onClick={askLogout} className="logout">
            <CiLogout />
          </div>
          <span className="nav-text">Logout</span>
        </>
      ) : (
        <Link to="/login">
          <div className="logout">
            <CiLogin />
          </div>
          <span className="nav-text">Login</span>
        </Link>
      )}
    </div>
  );
}

export default UserAuthIcon;
