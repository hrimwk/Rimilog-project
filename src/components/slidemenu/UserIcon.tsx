import styled from 'styled-components';
import { ReactElement } from 'react';

type PropsType = {
  icon: ReactElement;
  userText: string;
};
function UserIcon(props: PropsType) {
  const { icon, userText } = props;

  return (
    <UserIconContainer>
      <div className="user d-flex-center">{icon}</div>
      <span className="user-text">{userText}</span>
    </UserIconContainer>
  );
}
const UserIconContainer = styled.div`
  .user-text {
    display: inline-block;
    padding: 2px 40px 2px 0;
    margin-left: 20px;
    color: ${(props) => props.theme.colors.subGray};
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
`;
export default UserIcon;
