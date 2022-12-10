import { DefaultTheme } from 'styled-components';

const colors = {
  mainBlue: '#dde5f0',
  darkBlue: '#4b5564',
  pointBlue: '#3370cb',
  paleBlue: '#f7faff',
  iconColor: '#8f959f',
  subIvory: '#fdf3eb',
  subGray: '#777d87',
};

export type ColorsTypes = typeof colors;

const theme: DefaultTheme = {
  colors,
};
export default theme;
