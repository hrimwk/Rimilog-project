import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import Home from './pages/Home';
import SlideMenu from './components/SlideMenu';
import { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import NewPost from './pages/NewPost';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <SlideMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/newpost" element={<NewPost />} />
        <Route path="/board/detail/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
