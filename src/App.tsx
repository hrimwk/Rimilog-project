import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import Home from './pages/Home';
import SlideMenu from './components/SlideMenu';
import { useState } from 'react';

export interface sideMenuType {
  sideMenu: boolean;
  setSideMenu: (data: boolean) => void;
}
function App() {
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <GlobalStyles />
      <SlideMenu sideMenu={sideMenu} setSideMenu={setSideMenu} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
