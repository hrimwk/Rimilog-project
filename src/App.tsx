import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import Home from './pages/Home';
import SlideMenu from './components/slidemenu/SlideMenu';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import theme from './assets/styles/theme';
import Settings from './pages/Settings';

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
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/newpost" element={<NewPost />} />
          <Route path="/posts/detail/:id" element={<Post />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
