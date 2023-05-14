// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import WriteBorad from './WriteBoard';
import Headers from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import MyPage from './Mypage';
import 'bootstrap/dist/css/bootstrap.css';
import BoradList from './BoradList';
import BoardDetail from './BoardDetail';
import UpdateBoard from './UpdateBorad';
import LoginPage from './LoginPage';

function App() {
  return (
    // <div className="App">
      // <Home/>    
      <BrowserRouter>
      <Headers/>
      {/* <SideBar/> */}
      <Routes>
        {/* <Route path='/' element={<BoradList/>}/> */}
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/boardList' element={<BoradList/>}/>
        <Route path='/write' element={<WriteBorad/>}/>
        <Route path='/myPage' element={<MyPage/>}/>
        <Route exact path='/detail/:index' element={<BoardDetail/>}/>
        <Route exact path='/update/:index' element={<UpdateBoard/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
  );
}

export default App;
