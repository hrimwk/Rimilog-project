import { DefaultTheme } from 'styled-components';

const colors = {
  mainBlue: '#dde5f0',
  darkBlue: '#4b5564',
  pointBlue: '#3370cb',
  iconColor: '#8f959f',
  subIvory: '#ebe6d7',
  subGray: '#777d87',
};

export type ColorsTypes = typeof colors;

const theme: DefaultTheme = {
  colors,
};
export default theme;
