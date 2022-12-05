import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
const loginState = atom({
  key: 'loginState',
  default: false,
});

const slideMenuState = atom({
  key: 'slideMenuState',
  default: false,
});
export { loginState, slideMenuState };
