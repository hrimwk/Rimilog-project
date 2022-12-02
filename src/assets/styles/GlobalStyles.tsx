import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
  }
input{
  :focus{
    outline: none;
  }
}
  body {
    margin: 0 auto;
    min-height: 100vh;
    color : #000000;
    font-family: 'Noto Sans KR', sans-serif;
    max-width: 1440px;
  } 
  h1.title{
    font-size: 20px;
    margin-bottom: 30px;
    color: #616871;
  }
  .container{
    padding: 30px 30px 30px 90px !important;
    min-height: 100vh;
  }
  .d-flex {
    display: flex;
    justify-content: space-between;
  }
  .d-flex-center {
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 640px) {
    .container{padding: 30px 16px 70px !important;}
    .d-flex {
      flex-direction: column !important;
    }
    .d-flex-center {
    display: block;

  }
    }
`;

export default GlobalStyle;
