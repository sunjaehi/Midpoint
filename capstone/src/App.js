import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './page/Mainpage';
import Inputpage from './page/Inputpage';
import Resultpage from './page/Resultpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inputpage />}></Route>
        <Route path='/Resultpage' element={<Resultpage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
