import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import Home from './pages/Home';
import SlideMenu from './components/common/slidemenu/SlideMenu';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Board from './pages/board/Board';
import NewPost from './pages/board/NewPost';
import Detail from './pages/board/Detail';
import { ThemeProvider } from 'styled-components';
import theme from './assets/styles/theme';
import EditUser from './pages/EditUser';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <SlideMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/newpost" element={<NewPost />} />
          <Route path="/board/detail/:id" element={<Detail />} />
          <Route path="/edit" element={<EditUser />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
