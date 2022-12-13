export interface AuthFomType {
  label: string;
  value: string;
  id: number;
  name: string;
  placeHolder: string;
  type: string;
  alert?: string;
}
export interface Auth {
  email: string;
  password: string;
  nick_name?: string;
}

const formList: AuthFomType[] = [
  {
    label: '아이디',
    value: 'id',
    id: 1,
    name: 'email',
    placeHolder: '이메일 형식으로 작성해주세요.',
    type: 'text',
    alert: '이메일 형식이 아닙니다.',
  },
  {
    label: '닉네임',
    value: 'nick_name',
    id: 2,
    name: 'nick_name',
    placeHolder: '사용할 이름을 설정해주세요.',
    type: 'text',
  },
  {
    label: '비밀번호',
    value: 'pw',
    id: 3,
    name: 'password',
    placeHolder: '비밀번호를 입력해주세요.',
    type: 'password',
  },
];

export { formList };
