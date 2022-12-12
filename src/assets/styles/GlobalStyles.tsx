import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}

  

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    scroll
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
    -ms-overflow-style: none;
 }
 
::-webkit-scrollbar {
  display: none;
}


  h1{
    font-size: 30px;
    font-weight: bold;
  }
  h2{
    font-size: 24px;
    font-weight: bold;
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
  .mb-10{
    margin-bottom:10px ;
  }
  .mb-50{
    margin-bottom: 50px;
  }
  .mb-80 {
    margin-bottom: 80px;
  }
  .mt-30 {
    margin-top: 30px;
  }
  .d-flex {
    display: flex;
    justify-content: space-between;
  }
  .d-flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 640px) {
    .container{padding: 30px 16px 80px !important;
    min-height:100vh;}
    .d-flex {
      flex-direction: column !important;
    }
    .d-flex-center {
    display: block;

  }
    }
`;

export default GlobalStyle;
