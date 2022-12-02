import axios from 'axios';
import styled from 'styled-components';
import { Auth, AuthFomType } from '../pages/SignUp';

function UserAuth({
  formList,
  buttonString,
  setAuth,
  authInput,
  postMethod,
}: {
  formList: AuthFomType[];
  buttonString: string;
  setAuth: (data: Auth) => void;
  authInput: Auth;
  postMethod: string;
}) {
  function formSubmit(e: React.FormEvent) {
    e.preventDefault;
    const data = {
      ...authInput,
    };

    axios.post(`http://localhost:3000/${postMethod}`, data).then((res) => alert(res));
  }
  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAuth({ ...authInput, [e.target.name]: e.target.value });
  }

  return (
    <UserAuthContainer>
      <div className="container d-flex-center">
        <form onSubmit={formSubmit}>
          <ul>
            {formList.map((data: AuthFomType) => {
              return (
                <li key={data.id}>
                  <label>{data.label}</label>
                  <input type={data.type} name={data.name} onChange={inputChange} placeholder={data.placeHolder} />
                </li>
              );
            })}
          </ul>
          <button>{buttonString}</button>
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
