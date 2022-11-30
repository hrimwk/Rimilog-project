import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import Home from './pages/Home';
import SlideMenu from './components/SlideMenu';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <SlideMenu />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
