import styled from 'styled-components';
import { AuthFomType } from '../pages/SignUp';

function UserAuth({ formList }: { formList: AuthFomType[] }) {
  return (
    <UserAuthContainer>
      <div className="container d-flex-center">
        <form>
          {formList.map((data: AuthFomType) => {
            return (
              <>
                <label>{data.label}</label>
                <input type="text" />
              </>
            );
          })}
          <button>가입하기</button>
        </form>
      </div>
    </UserAuthContainer>
  );
}
const UserAuthContainer = styled.div`
  form {
    flex-grow: 1;
    max-width: 400px;
    margin: 0 auto;
  }

  label {
    display: block;
    margin-bottom: 3px;
  }
  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 25px;
    border: 1px solid #ddd;
    border-width: 0 0 1px 0;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
  }
`;
export default UserAuth;
