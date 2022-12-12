import styled from 'styled-components';

function NoPost() {
  return <NoPostContainer>No posts</NoPostContainer>;
}
const NoPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  font-size: 20px;
`;
export default NoPost;
