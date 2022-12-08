import { atom } from 'recoil';

const loginState = atom({
  key: 'loginState',
  default: false,
});
const slideMenuState = atom({
  key: 'slideMenuState',
  default: false,
});
const nickNameState = atom({
  key: 'nickNameState',
  default: '',
});

export { loginState, slideMenuState, nickNameState };
