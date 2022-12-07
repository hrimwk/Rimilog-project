import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NotLoggedIn() {
  return (
    <NotLoggedInContainer className="container d-flex-center">
      <div>
        <h2 className="title">
          해당 서비스는
          <br />
          <span className="point-text">로그인</span> 이후에 이용 가능합니다.
        </h2>
        <p>
          <Link to="/login">로그인</Link>하고 서비스 이용하기
        </p>
        <p>
          혹시 아직 회원이 아니신가요? &nbsp;<Link to="/signup">회원가입</Link>
        </p>
      </div>
    </NotLoggedInContainer>
  );
}
const NotLoggedInContainer = styled.div`
  text-align: center;
  .point-text {
    font-weight: bold;
    color: ${(props) => props.theme.colors.pointBlue};
    font-size: 25px;
  }
  .title {
    padding: 50px 0;
    font-size: 20px;
    line-height: 40px;
  }
  p {
    padding: 5px 0;
    font-size: 14px;
    color: #666;
    a {
      color: ${(props) => props.theme.colors.pointBlue};
      text-decoration: underline;
    }
  }
`;
export default NotLoggedIn;
