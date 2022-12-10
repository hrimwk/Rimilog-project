import styled from 'styled-components';
type PropsType = {
  total: number;
  limit: number;
  page: number;
  setPage: (data: number) => void;
};
function Pagination(props: PropsType) {
  const { total, limit, page, setPage } = props;

  const numPages = Math.ceil(total / limit);
  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill(null, 0, Array(numPages).length)
        .map((_, i) => (
          <Button key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? 'page' : undefined}>
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  padding: 8px;
  margin: 0;
  color: #ddd;
  font-size: 1rem;
  background: none;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    color: #333;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
export default Pagination;
