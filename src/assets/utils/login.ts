import { AuthFomType } from './signup';

const loginFormList: AuthFomType[] = [
  { label: '아이디', value: 'id', id: 1, name: 'email', placeHolder: '아이디(이메일)를 입력해주세요.', type: 'text' },
  {
    label: '비밀번호',
    value: 'pw',
    id: 3,
    name: 'password',
    placeHolder: '비밀번호를 입력해주세요.',
    type: 'password',
  },
];

export { loginFormList };
